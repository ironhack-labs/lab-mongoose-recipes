const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    Recipe.create({
      title: "la recette de Sara",
      level : "Easy Peasy",
      ingredients :["pate", "huile d'olive", "oignons", "champignons", "tomates","mozzarella", "emmental", "courgettes", "thym"],
      cuisine: "Italiene",
      dishType: "Dish",
      image : "https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?cs=srgb&dl=cheese-delicious-dinner-2232.jpg&fm=jpg", 
      duration: 20, 
      creator: "cecile de sicile"
      // created: {type:Date, default: Date.now}
    }) .then(recipe => { console.log('The recipe have been created and its title is : ', recipe.title)})
    .catch(err => { console.error('An error occured', err) });
    Recipe.insertMany(data)
    .then(recipe => {
      recipe.map(r=>console.log(r.title))
      Recipe.updateOne({title: "Rigatoni alla Genovese"}, { duration: 300 })
      .then(recipe => {
      console.log(`the recipe have been updated.`)
      Recipe.deleteOne({title: "Rigatoni alla Genovese"})
      .then(recipe => {
        console.log(`the recipe have been deleted`)
        mongoose.disconnect().then(() => console.log("disconnected")).catch(err => console.log('error occured'))
    })
      .catch(err => console.error('An error occured', err))
    })
  // console.log("successfully updated !!")})
    .catch(err => console.error('An error occured', err));
    })
    .catch(err => console.error('An error occured', err))

  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



// Recipe.create({
//   title: "la recette de Sara",
//   level : "Easy Peasy",
//   ingredients :["pate", "huile d'olive", "oignons", "champignons", "tomates","mozzarella", "emmental", "courgettes", "thym"],
//   cuisine: "Italiene",
//   dishType: "Dish",
//   image : "https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?cs=srgb&dl=cheese-delicious-dinner-2232.jpg&fm=jpg", 
//   duration: 20, 
//   creator: "cecile de sicile"
//   // created: {type:Date, default: Date.now}
// }) .then(recipe => { console.log('The recipe have been created and its title is : ', recipe.title)})
// .catch(err => { console.error('An error occured', err) });


// Recipe.insertMany(data)
// .then(recipe => recipe.map(r=>console.log(r.title)))
// .catch(err => console.error('An error occured', err))

// Recipe.updateOne({title: "Rigatoni alla Genovese"}, { duration: 300 })
// .then(recipe => {
//   //console.log(recipe)
//   console.log(`the recipe ${recipe.title} have been updated. The new duration is ${recipe.duration}`)})
//   // console.log("successfully updated !!")})
// .catch(err => console.error('An error occured', err));

// Recipe.deleteOne({title: "Rigatoni alla Genovese"})
// .then(recipe => {console.log(`the recipe have been deleted`)})
// .catch(err => console.error('An error occured', err))