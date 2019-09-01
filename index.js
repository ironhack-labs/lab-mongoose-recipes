const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


// let a = {
//   title: 'Dorothea Spicy Pasta',
//   level: 'German Chef',
//   ingredients: ['pasta', 'red pepper'],
//   cuisine: 'German',
//   dishType: 'Dish',
//   image: 'https://target.scene7.com/is/image/Target/GUEST_7c2f5da1-86b0-41c7-83a5-a21359f82e6e?wid=488&hei=488&fmt=pjpeg',
//   duration: 30000,
//   creator: 'Chef Dorothea'
// }

// Recipe.create(a)


// Recipe.insertMany(data)
//   .then(res => res.map(r => console.log(r.title)))
//   .catch(err => console.log("err"))


Recipe.findByIdAndUpdate("5d669045a70feb0f9a5a889d",{duration:100})
.then(() => console.log("duration updated!!!"))

// Recipe.findByIdAndUpdate("", {creator:"Chef Antonin"}).then(() => console.log("blabla"))


Recipe.deleteOne({ title: 'Carrot Cake' }, () => console.log("success"));

// mongoose.disconnect()