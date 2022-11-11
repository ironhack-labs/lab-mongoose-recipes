const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { create } = require('./models/Recipe.model');

// const MONGODB_URI = 'mongodb+srv://caroacuna90:susanahoria22@cluster0.gxu5cpk.mongodb.net/test';
const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database"`);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

/*   let newRecipe = {
    title: "empanadas",
    cuisine: "arg",
      }
 */
  /*  Recipe.create(newRecipe)
  .then((response)=>{
    console.log(response.title)
      mongoose.connection.close()
  }) 
  .catch(err => console.log(err))
    */



/*   Recipe.insertMany(data)
  .then((response) => {
    console.log(response.title)
    })
  .catch(err => console.log(err))
   */
/* 
  Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
  .then((response) => {
  console.log("this is a success message: ", response)  
    })
    .catch(err => console.log(err)) */

/*     Recipe.deleteOne({title: "Carrot Cake"})
    .then((response) => {
      console.log("this is another success message: ", response)
    })
    .catch(err => console.log(err)) */


    mongoose.connection.close()