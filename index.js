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


  // function createRecipe(title, level, ingredients, cuisine, dishType, image, duration, creator, created) {
  //   return Recipe.create ({
  //     title,
  //     level,
  //     ingredients,
  //     cuisine,
  //     dishType,
  //     image,
  //     duration,
  //     creator,
  //     created
  //   })
  // }

  // createRecipe(
  //   "crepe",
  //   "Easy Peasy",
  //   ["banana", "chocolate"],
  //   "French",
  //   "Dessert",
  //   "",
  //   10,
  //   "Moi",
  //   "2020-01-29"
  // )

  function insertAll() {
    Recipe.insertMany(data)
      .then(res => {
        console.log({title}, res);
           mongoose.disconnect();
      })
      .catch(err => {
        console.error(err);
      })
  }

  // insertAll();

  // function updateRecipe(id, newDur) {
  //   Recipe.findByIdAndUpdate(id, {duration: newDur})
  //   .then(res => {
  //     console.log("Title is updated", res);
        // mongoose.disconnect();
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   })
  // }

  // updateRecipe("5e31a97b21c1ed483e084d4b", 100);

  // function deleteRecipe(id) {
  //   Recipe.findByIdAndRemove(id)
  //     .then(res => {
  //       console.log("The recipe has been deleted", res);
            // mongoose.disconnect();
  //     })
  //     .catch(res => {
  //       console.error(err);
  //     });
  // }

  // deleteRecipe("5e31a97b21c1ed483e084d4a");

