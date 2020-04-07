const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Iteration 2 Create a recipe
    createRecipe("Shrimp", "Easy Peasy", ["shrimp", "garlic", "butter"], "Mexican", "main_course", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.foodnetwork.com%2Frecipes%2Frachael-ray%2F4-minute-spicy-garlic-shrimp-recipe-1915190&psig=AOvVaw2NHoYQZ4a1DrodTuh73cpi&ust=1586317051332000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIiBxtWx1egCFQAAAAAdAAAAABAD", 20, "Chef Gladys")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // Iteration 2 Create a recipe

function createRecipe(title, level, ingredients, cuisine, dishType, image, duration, creator, created) {
  Recipe.create({title, level, ingredients, cuisine, dishType, image, duration, creator, created })
  .then((newRecipe) => console.log(`Recipe title`))
  .catch((err) => console.error(`Error adding recipe`));
}

// Iteration 3 Insert multiple recipes -example

// const doc1 = { "name": "basketball", "category": "sports", "quantity": 20, "reviews": [] };
// const doc2 = { "name": "football",   "category": "sports", "quantity": 30, "reviews": [] };

// return itemsCollection.insertMany([doc1, doc2])
//   .then(result => {
//     console.log(`Successfully inserted ${result.insertedIds.length} items!`);
//     return result
//   })
//   .catch(err => console.error(`Failed to insert documents: ${err}`))

// Iteration 4 - Update recipe

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then((x) => console.log("Recipe updated"))
  .catch((err) => console.error("Error updating recipe"));

// Iteration 5 - Remove a recipe

Recipe.deleteOne({ title: 'Carrot Cake' })
.then((y) => console.log("Recipe deleted"))
.catch((err) => console.error("Error deleting recipe"));