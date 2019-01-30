const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema({
  title : { type:String, require: true, unique: true,},
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients : Array,
  cuisine: { type: String, require: true},
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg.' },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
//module.exports = Recipe;



mongoose.connect('mongodb://localhost/recipeApp')
.then(() => {
  console.log('Connected to Mongo!');
  return Recipe.create({ 
    title : 'Spanish Omelette',
    level: 'Easy Peasy',
    ingredients : ['Eggs', 'potatoes', 'salt'],
    cuisine: "Spanish",
    dishType: ['Dish'],
    image:'https://images.media-allrecipes.com/images/75131.jpg.',
    duration: 60,
    creator: 'Chef Sofia',
  })
})

.then(() => {
  return Recipe.insertMany(data)  
})

.then(respuesta=>{
  console.log(respuesta)
  return Recipe.updateMany({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
})

.then(() => {
  (console.log("Success!"))
  return Recipe.deleteOne({ title: 'Carrot Cake'})
})

.then(() => {
  (console.log("Deleted"))
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
})


.catch(err => {
  console.error('Error connecting to mongo', err);
  });
  

