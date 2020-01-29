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


let japanCurryRecipe = [{
    title: "Japanese Curry",
    level: "Easy Peasy",
    ingredients: ["Beef", "Water", "Rice", "Curry mix"],
    cuisine: "Japanese",
    dishType: "Dish",
    duration: 30,
  }]




Recipe.create(japanCurryRecipe)
  .then(recipe => {
    console.log(recipe[0].title)
    Recipe.insertMany(data)
      .then(insertedRecipe => {
        console.log(data.map(element => element.title))
        Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
          .then(updatedRecipe => {
            console.log("Success! Duration changed")
            Recipe.deleteOne({title: "Carrot Cake"})
              .then(deletedRecipe => {
                console.log("Carrot Cake deleted!")
                mongoose.disconnect()
              })
              .catch(err => console.log("couldn't delete the recipe"))
            })
          .catch(err => console.log("duration failed to change"))
        })
      .catch(err => console.log("data not inserted!"))    
    })
  .catch(err => console.log("recipe not created!"))







