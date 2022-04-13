const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(recipeSchema => {
    console.log(`Connected to the database: "${recipeSchema.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  // .then(() => {
  //   // Run your code here, after you have insured that the connection was made
  //   Recipe
  //     .create({ title: 'Risotto', level: "Amateur Chef", ingredients: ["Arroz", "setas", "vino", "queso"], cuisine: "Italiana", dishType: "main_course", duration: 90, creation: "María" })
  // })

  .then(() => 
     Recipe.insertMany(data) //NO ENTIENDO POR QUÉ VA SIN CORCHETES
  )

  .then(() => 
     Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })  
    // console.log("El perro modificado es:", Recipe)
)
  
  .then(() =>  
    Recipe.deleteOne({ title: "Carrot Cake"})
    )
  
.then(() => 
  mongoose.connection.close(() => {
    console.log()
    // process.exit(0)
  }))

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
