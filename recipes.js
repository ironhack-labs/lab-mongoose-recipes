const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema({
  title: {type:String, required: true, unique: true},
  level: {type:String, enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [String],
  cousine: {type: String, required: true},
  dishType: {type: String, enum:['Breakfast','Dish','Snack','Drink','Dessert','Other' ]},
  image: {type:String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type:Number, min:0},
  creator: String,
  crerated: {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema );

// iteration 2

// Recipe.create({ title: 'foo', level:'Easy Peasy', ingredients:['Apple','Bread'], cousine: 'French'}, (err,recipe )=>{
//  if (err) {
//    console.log(err)
//  } else {
//    console.log(recipe.title,'Recipe added successfully')
//  }

// });

// iteration 3

// Recipe.insertMany(data,(err,recipe )=>{
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('Recipe added successfully');
//     Recipe.find({}, (err,recipe) => {
//       recipe.forEach((item)=> {
//        console.log(item.title)
//       });
// })
//   }
// });

// iteration 4

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
 .then(()=> {
   console.log('Update success')
 })
 .catch((err)=> {
   console.log(err)
 });
 




