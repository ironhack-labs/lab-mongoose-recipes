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
  .then(() => {

    //Iteration 2 - Create a recipe
    /*Recipe.create({title: "Orange", level: "Easy Peasy", ingredients: ["Oranges"], 
      cuisine: "Spanish", dishType: "dessert", duration: 10, creator: "Mrs Munoz"
        })
        .then(recipe => {
        console.info(`Cretate new recipe: ${recipe}`)
        })
        .catch(err => console.error('Error creating recipe:', err))*/

    Recipe.insertMany(data)
        .then(data => console.info(`Insert ${data}`))
        .then(() => {
          Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
            .then(console.info(`Update correct `))
            .catch(err => console.error(`Error updating`, err))
          })
        .then(() => {
          Recipe.deleteOne({title: "Carrot Cake"})
            .then(console.info(`Delete correct`))
            .catch(err => console.error(`Error delete`, err))
         })
         .then(() => {
            Recipe.find({title: {$exists:true}}, {title:1})
              .then(titles => console.info('Los titulos son: ', titles))
              .catch(err => console.error("Surgio un error: ", err))
         })
        })
        .catch(err => console.error('Error insert data:', err))
    
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



