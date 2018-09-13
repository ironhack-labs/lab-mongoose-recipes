const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')

const recipeSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: Array,
  cousine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
})

const Recipes = mongoose.model('Recipe', recipeSchema);



mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
    Recipes.collection.drop();
    //Una receta
    Recipes.create({
      title: 'Pizza',
      level: 'Amateur Chef',
      ingredients: ['Pepperoni', 'Cheese'],
      cousine: 'Italian',
      dishType: 'Dish',
      duration: 40,
      creator: 'Raul y Christian',
    })
    Recipes.insertMany(data)
    .then(() => {
      Recipes.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 50}, {new:true})
      .then(recipe => {
        console.log(recipe)  //lo dejamos así para ver una demostración que nos hizo Gabi.
      })
      
      Recipes.deleteOne({title: "Carrot Cake"})
      .then(console.log("Success removing Carrot Cake"));
    })

  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

mongoose.disconnect();