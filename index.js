const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


const ireneRecipe = {
  title: "Calabacines al estilo de Cerdeña",
  cuisine: "italian",
  duration: 50,
  creator: "mjditifet"

}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    Recipe.create(ireneRecipe)
      .then(nuevareceta => console.log(`Nueva receta añadida: ${nuevareceta.title}`))
      .catch(err => console.log(err))
  })

//problemas con el save
Recipe.insertMany([{
    title: "Gambas a la gabardina",
    cuisine: "spanish",
    duration: 50,
    creator: "futurobloguero"

  },
  {
    title: "Canelons de carn a la Catalana",
    cuisine: "catalana",
    duration: 120,
    creator: "catalangrandmothers"

  },
  {
    title: "tarta Tatin",
    cuisine: "french",
    duration: 35,
    creator: "Tatin sisters"

  }
]).then(res => {
  console.log("Varias recetas añadidas", res)
})

Recipe.findOneAndUpdate({
  title: "Rigatoni alla Genovese"
}, {
  duration: 100
}).then(res => {
  console.log("Receta encontrada y actualizada", res.body.title)
})

Recipe.deleteOne({
    title: 'Carrot Cake'
  })
  .then(() => console.log("recipe deleted"))
  .then(() => mongoose.connection.close())






  .catch(error => {
    console.error('Error connecting to the database', error);
  });