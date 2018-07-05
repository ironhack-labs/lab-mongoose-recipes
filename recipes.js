const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  //Iteration 1
  const recipeSchema = new Schema ({
    title: String,
    level: {type: String, enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: Array,
    couisine: {type: String, required: false},
    dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, minlength: 0},
    creator: String,
    created: {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema)


// //create one recipe: Iteration 2
// Recipe.create ({
//   title: 'Chocolate Chip Cookies',
//   level: 'Amateur Chef',
//   ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet chocolate chips'],
//   cousine: 'French',
//   dishType: ['Dish'],
//   image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
//   duration: 30,
//   creator: 'Chef Jennifer'
// })



// //insert all recipes from data.js: Iteration 3
// Recipe.insertMany(data);

// //update one recipe: Iteration 4
// Recipe.findByIdAndUpdate("5b3e627cfb68341a274268f8", {
//   duration: 100
// })
// .then((response)=>{
//   console.log(response)
// })
// .catch((err)=>{
//   console.log(err)
// })

// //remove a recipe: Iteration 5
// Recipe.findByIdAndRemove("5b3e627cfb68341a274268f7")
// .then((response)=>{
//   console.log(response)
// })
// .catch((err)=>{
//   console.log(err)
// })

// //Close database: Iteration 6
mongoose.disconnect('mongodb://localhost/recipeApp')

