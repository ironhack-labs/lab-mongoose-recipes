const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'


// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// let newRecipeOfAntonin = {
// title: 'Antonin Spicy Pasta',
// level: 'French Chef',
// ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
// cuisine: 'French',
// dishType: 'Dish',
// image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
// duration: 100,
// creator: 'Chef Antonin'
// };

// Recipe.create(newRecipeOfAntonin);

// Recipe.insertMany(data)
//   .then((res) => {
//     res.map(r => console.log(r.title)); // the data is in an array that is why
//     // you map() the data 
//     // would it be an object then no map() neccessary
//   }).catch(err => console.log('err'));


// id of the database: 5d668df8cab3d161e0e5320c
// Recipe.findByIdAndUpdate("5d668df8cab3d161e0e5320c", {duration: 100})
// .then(() => console.log("duration updated."));

// change the creator of id 5d668df8cab3d161e0e53208
// Recipe.findByIdAndUpdate("5d668df8cab3d161e0e53208", {creator: "Chef Antonin"})
// .then(() => console.log("title updated."));

// Recipe.findByIdAndUpdate("5d668df8cab3d161e0e53208", {creator:"Chef Antonin"}).then(() => console.log("blabla"))

// Recipe.deleteOne({title: 'Carrot Cake'}, function(err) {})
// .then(() => console.log("deleted"));

   