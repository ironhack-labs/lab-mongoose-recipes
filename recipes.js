const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema({
  title: {type: String, unique: true},
  level: {type:String, enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [],
  cousine: {type:String, required: true},
  dishType: {type:String, enum:['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type:String, default: '//images.media-allrecipes.com/images/75131.jpg'},
  duration: {type:Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
});
const data = require('./data.js')

const Recipe = mongoose.model('Recipe', recipeSchema);


//Iteration 6




//Iteration 5

// Recipe.findByIdAndRemove("5b3e5af359c35332182b39df")
// .then((response)=>{
//       console.log("yeah! it worked!")
//           console.log(response);
//   })
//   .catch((err)=>{
//       console.log("no! it didnt work")
//   })


//Iteration 4

// Recipe.findByIdAndUpdate("5b3e5af359c35332182b39e0", {
//     duration: 100
// })
// .then((response)=>{
//     console.log("yeah! it worked!")
//         console.log(response);
// })
// .catch((err)=>{
//     console.log("no! it didnt work")
// })

//Iteration 3

// Recipe.insertMany(data);

//Iteration 2

// Recipe.create({name: 'Burger',cousine: 'American'})




