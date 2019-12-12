const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .then(() => Recipe.create({
    title: "Rendang",
    level: "Intermediate",
    ingredients: ["700g Beef", "1 Cinnamon Stick", "3 Cloves", "3 star Anise", "3 Cardamom pods", "1 lemongrass stalk", "500ml coconut milk", "500 ml Water",],
    cuisine: "Indonesian",
    dishType: "Meat",
    image: "https://rasamalaysia.com/wp-content/uploads/2018/04/beef-rendang.jpg",
    duration: 90,
    creator: "Dominik Antunovic",
    created: "2019-12-12"}))
  .then(recipe => console.log("A new recipe has been added:", recipe))
  .then(() => Recipe.insertMany(data))
  .then(recipes => recipes.forEach(x => console.log(x.title, "added to the database!")))
  .then(() => Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: "100"}))
  .then(success => console.log("Successfully updated the recipe!", success.title))
  .then(() => Recipe.findOneAndDelete({title: "Carrot Cake"}))
  .then(recipe => console.log("The following recipe has been deleted!", recipe.title))
  .then(() => mongoose.connection.close())
  .then(() => console.log("Connection to database has been terminated"))
  .catch(err => console.log("Something went wrong!", err));