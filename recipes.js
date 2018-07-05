const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

  const newRecipeSchema = new Schema({
    title: String,
    level:{
      type: String,
      enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
    },
    ingredients: Array,
    cousine: {
      type: String,
      required: true
    },
    disType:{
      type: String,
      enum:['Breakfast','Dish','Snack','Drink','Dessert','Other']
    },
    image: {
      type: String,
      default: 'https://images.media-allrecipes.com/images/75131.jpg.'
    },
    duration:{
      type: Number,
      min: 0
    },
    creator: String,
    created: {
      type:Date,
      default: Date.now
    }
   })

const Recipe = mongoose.model('Recipe', newRecipeSchema)



// Recipe.create(data , ()=> console.log('recipe creado'))



Recipe.findByIdAndUpdate("5b3e6b955c5d080ccdd23c74", {duration: 100})
  .then(console.log('actualizado'))
  .catch(err=>console.log('error: '+ err));

Recipe.findByIdAndRemove("5b3e6b955c5d080ccdd23c73")
.then(console.log('borrado'))
.catch(err=>console.log('error: '+ err));





mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

