const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    agregarReceta();
    agregarRecetasJson();
    actualizarReceta('Rigatoni alla Genovese');
    borrarReceta('Carrot Cake');
    
    setTimeout(() => {
      mongoose.connection.close() 
      console.log("Cerre la DB con connection.close()")
    }, 2000)

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


//Nueva Receta
async function agregarReceta(){
  let carneRecipe = await Recipe.create({
    title: "Carne Asada a la Tampiqueña",
    level: "Amateur Chef",
    ingredients: ["Carne Filete", "Frijoles", "Aguacate", "Queso", "Tortilla", "Salsa"],
    cuisine: "Mexicana",
    dishType: "main_course",
    duration: 30,
    creator: "Daniel"
  })
  .then(() => {
    console.log('Adding - Carne Asada');
  })  
  .catch(() => {
    console.log('Error Adding - Carne Asada');
  });
}

//Receta from file
async function agregarRecetasJson(){
  await Recipe.insertMany(data)
  .then(() => {
    console.log('Adding - Multiple Data');
  })  
  .catch(() => {
    console.log('Error Adding - Multiple Data');
  });
}

//Update Titulo
async function actualizarReceta(title)
{
  await Recipe.findOneAndUpdate({title}, {duration: 100})
  .then(() => {
    console.log(`Update - ${title}`);
  })  
  .catch(() => {
    console.log(`Error Update - ${title}`);
  });
}

//Borrar Titutlo
async function borrarReceta(title)
{  
  await Recipe.deleteOne({title})
  .then(() => {
    console.log(`Delete - ${title}`);
  })  
  .catch(() => {
    console.log(`Error Delete - ${title}`);
  });
}

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Cerre la DB por Ctrl+C"
    )
    process.exit(0)
  })
})
