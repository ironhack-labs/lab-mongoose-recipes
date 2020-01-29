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

  
// ============
// Iteration 2
// ============
function createRecipe(title, level, ingredients, cuisine, dishType, duration, creator){
  Recipe.create({
    title,
    level,
    ingredients,
    cuisine,
    dishType,
    duration,
    creator
  })
  .then(res => {
    console.log(title);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
  });
};

// createRecipe("Crepes", "Easy Peasy", ["flour", "eggs", "milk", "salt", "butter", "beer", "orange blossom water", "lemon zest"], "French", "Dessert", 60, "Nina")

// ============
// Iteration 3
// ============
function importData(array){
  Recipe.insertMany(array)
  .then(res => {
    array.map(item => console.log(item.title));
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
  });
};

// importData(data);

// ============
// Iteration 4
// ============
function updateData(id, newValue){
  Recipe.findByIdAndUpdate(id, { duration: newValue })
    .then(res => {
      console.log("Updated Successfully !", res);
      mongoose.disconnect();
    })
    .catch(err => {
      console.error(err);
    });
};

// updateData("5e31aab763c0c55308849753", 100);

// ============
// Iteration 5
// ============
function deleteRecipe(value) {
  Recipe.deleteOne({ title: value })
    .then(res => {
      console.log("Recipe Deleted.", res);
      mongoose.disconnect();
    })
    .catch(err => {
      console.error(err);
    });
};

// deleteRecipe("Carrot Cake")