const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {

    Recipe

      //ITERATION 2
      //add a new recipe document to the database by calling the Model.create static, passing it the recipe details as an object.

      .create([
        {
          title: "Boniato",
          level: "Easy Peasy",
          ingredients: ["Boniato", "Aceite", "Especias"],
          cuisine: "Mediterranea",
          dishType: "other",
          image: "https://imag.bonviveur.com/foto-de-la-portada-de-los-bastones-de-boniato-al-horno.jpg",
          duration: 45,
          creator: "Miguel Ortega",
          created: new Date(1995, 11, 17, 3, 24, 0)
        },
      ])

      //ITERATION 3
      /*
      importing an array of recipes form the data.json file. Using the Model.
      insertMany static, you should add the entire array to the database.
      After inserting the documents, print the title of each recipe to the console.
      */

      .then(() => {
        return Recipe.insertMany(data)
      })

      .then(newRecipe => newRecipe.forEach(elm => console.log(`Title: ${elm.title}`)))
      .catch(err => console.log('error', err))

      //ITERATION 4
      /*
      The Rigatoni alla Genovese does not take that long. 
      You should update the duration field and set it to 100.
      */

      .then(() => {
        return Recipe.updateOne({ name: 'Rigatoni alla Genovese' }, { duration: 100 })

      })
      .then(info => console.log("Los detalles de la modificación son:", info))
      .catch(err => console.log('error', err))

      //ITERATION 5
      /*
      Using the Model.deleteOne static, remove that recipe from the database and display a success message after doing it
      */

      .then(() => {
        return Recipe.deleteOne({ name: "Carrot Cake" })

      })
      .then(info => console.log('Este es un objeto informativo sobre una elimiación', info))
      .catch(err => console.log('Se produjo un error', err))

      .then(() => {
        mongoose.connection.close()
      })


  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

