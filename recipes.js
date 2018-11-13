const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const recipe = new Schema({
  title: {required: true, type: String},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingrdients: [],
  cuisine: {required: true, type: String},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: ' https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date()}
})



mongoose.connect('mongodb://localhost/recipeApp')
.then(() => {
  console.log('Connected to Mongo!');
}).catch(err => {
  console.error('Error connecting to mongo', err);
});

const Recipe = mongoose.model('recipes', recipe);

// Recipe.create({
//   title: 'Fabada Asturiana',
//   level: 'UltraPro Chef',
//   ingredients: ['beans', 'onion', 'garlic', 'olive oil', 'bay leaf', 'saffron', 'smoked bacon'],
//   cuisine: 'Spanish food',
//   dishType: 'Dish',
//   duration: 120,
//   creator: 'Pelayo',
// })

// .then((x)=>{
//   console.log(x)
// })

// .catch(()=>{
// console.log(x)
// })


// Recipe.insertMany(data)

// .then((x)=>{
//   console.log(x)
// })

// .catch(()=>{
// console.log(x)
// })


// Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: "100" })
//   .then(()=>{
//     console.log('Succes!')
//   })
//   .catch(()=>{
//   })


Recipe.deleteOne({ title: "Carrot Cake"})
  .then(()=>{
    console.log('deleted')
  })
  .catch(()=>{
    
  })