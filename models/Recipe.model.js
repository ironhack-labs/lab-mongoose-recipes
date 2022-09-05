const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: {
    type: [String],
  },
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: 2022-09-05,
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

mongoose.connect('mongodb://localhost:27017/lab-recipe');

// create a new recipe

// Recipe.create({title:'Egg Fried Rice', 
// level:'Easy Peasy', 
// ingredients:['1 cup rice', '2 eggs', '1/2 teaspoon salt', '1/2 cup vegetable oil'], 
// cuisine: 'Asian',
// dishType: 'main_course',
// image: 'https://unsplash.com/photos/oT7_v-I0hHg',
// duration: 30,
// creator: 'Chef Anna Erika'},
// )
// .then(createdRecipe => console.log(createdRecipe))
// .catch(err => console.log(err))


// insert multiple recipes

// const multipleRecipes = [
// {title:'Chicken Pops', 
// level:'Easy Peasy', 
// ingredients:['1 cup rice', '2 eggs', '1/2 teaspoon salt', '1/2 cup vegetable oil'], 
// cuisine: 'Asian',
// dishType: 'main_course',
// image: 'https://unsplash.com/photos/oT7_v-I0hHg',
// duration: 30,
// creator: 'Chef Anna Erika'},

// {title:'Fish Nuggets', 
// level:'Easy Peasy', 
// ingredients:['1 cup rice', '2 eggs', '1/2 teaspoon salt', '1/2 cup vegetable oil'], 
// cuisine: 'Asian',
// dishType: 'main_course',
// image: 'https://unsplash.com/photos/oT7_v-I0hHg',
// duration: 30,
// creator: 'Chef Anna Erika'},
// ]
// Recipe.insertMany(multipleRecipes, createdRecipe => console.log(createdRecipe))


// update a recipe

// Recipe.findByIdAndUpdate('6315b8d987ebfe5d626a7dcb', 'duration')
// Recipe.findOneAndUpdate({duration:220}, {duration:100}, {new:true})
// .then(updatedRecipe => console.log(updatedRecipe))
// .catch(err => console.log(err))


// remove a recipe

// Recipe.findOneAndDelete({ title: 'Carrot Cake' })
// 	.then(deletedRecipe => console.log(deletedRecipe))
// 	.catch(err => console.log(err))


// close the databse

mongoose.connection.close()