const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipes = require('./data.js');




const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.collection.drop();
  })
  .then(() => {

    //it 2
    return Recipe.create({ title: 'Fried eggs', level: 'Easy Peasy', cuisine: 'Spanish' })
      .catch((err) => {
        console.log('An error happened:', err);
      })
      .then((recipe) => {
        console.log('The recipe is saved and its title is: ', recipe.title)
      })
  })
  .then(() => {
    return Recipe.insertMany(recipes)
      .catch((err) => console.log('An error happened:', err))
      .then((recps) => {
        recps.forEach(function (recp) {
          console.log('The recipe is saved and its title is: ', recp.title);
        })
      })

  }
  )

  .then(() => {
    return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(
        () => console.log('The recipe has been updated')
      )
      .catch(() => console.log('An error happened'));
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => {
        console.log("The recipe has been deleted");
        mongoose.disconnect();
      })
      .catch((err) => console.log("An error has happened", err))
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  })
  ;



