const mongoose = require('mongoose');
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const RecipeSchema = new mongoose.Schema({
  title: String,
  level: String,
  ingredients: Array,
  cuisine: String,
  dishType: String,
  image: String,
  duration: Number,
  creator: String,
  created: Date
})

const Recipe = mongoose.model("recipe", RecipeSchema)

Recipe.create({
  title: "Shakshuka",
  level: "easy",
  ingredients: "Tomatoes, Eggs, Bellpeppers, Paprika, Olive-oil, Zaatar",
  cuisine: "middle-easter",
  dishType: "cooked",
  image: "/public/img/shakshuka.jpg",
  duration: 20,
  creator: "Dr. Shakshuka",
  create: new Date()
}).then(recipe => console.log(recipe.title)).catch(error => console.log(error))

Recipe.insertMany(data, (error, recipes) => {
  error ? console.log(error) : console.log("inserted")
})

Recipe.updateOne({
    title: 'Rigatoni alla Genovese'
  }, {
    duration: 100
  })
  .then(console.log("victory"))
  .catch(console.log("oops"))

if (Recipe.find({
    title: 'Carrot Cake'
  })) {
  Recipe.deleteOne({
      title: 'Carrot Cake'
    })
    .then(console.log("deleted"))
    .catch(console.log("shit not deleted"))
}

setTimeout(() => mongoose.disconnect(), 1500)