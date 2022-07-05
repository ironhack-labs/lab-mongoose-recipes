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
        console.log(`Cretate new recipe: ${recipe}`)
        })
        .catch(err => console.log('Error creating recipe:', err))*/

    //Iteration 3 - Insert multiple recipes
    Recipe.insertMany(data)
        .then(data => console.log(`Insert ${data}`))
        .catch(err => console.log('Error insert data:', err))
    
    //Iteration 4 - Update recipe
    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
        .then(console.log(`Update correct `))
        .catch(err => console.log(`Error updating`, err))

    //Iteración 5 - Eliminar una receta
    Recipe.deleteOne({title: "Carrot Cake"})
        .then(() => {
          console.log(`Delete correct`)
          mongoose.connection.close()
      })
        .catch(err => console.log(`Error delete`, err))
    })

  .catch(error => {
  console.error('Error connecting to the database', error);
  });

  Recipe.find({title: {$exists:true}}, {title:1})
    .then(titles => console.log('Los titulos son: ', titles))
    .catch(err => console.log("Surgio un error: ", err))