const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


let japanCurryRecipe = [
  {
    title: "Japanese Curry",
    level: "Easy Peasy",
    ingredients: ["Beef", "Water", "Rice", "Curry mix"],
    cuisine: "Japanese",
    dishType: "Dish",
    duration: 30,
  }
]


Recipe.create(japanCurryRecipe, function(error, res){})

Recipe.insertMany(data, function(error, docs){})

Recipe.update({title: "Rigatoni alla Genovese"}, {duration: 100})
  .then(res => console.log("Success!"))
  .catch(err => console.log("Failed!"))


  Recipe.deleteOne({title: "Carrot Cake"})
    .then(res => console.log("Carrot Cake deleted!"))
    .catch(err => console.log("ERROR"))

    mongoose.disconnect()