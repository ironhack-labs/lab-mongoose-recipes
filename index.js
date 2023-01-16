const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

//const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'; -> NO FUNCIONA POR QUE?
const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((deleted) => {
    return Recipe.create({
      "title": "Sicilian Lemon Parma Ham Risotto",
      "level": "Amateur Chef",
      "ingredients": [
        "1 cup of rice",
        "2 cups of vegetable broth",
        "zest of a sicilian lemon",
        "1 sicilian lemon squeezed",
        "1/2 cup parmesan",
        "200g parma han"
      ],
      "cuisine": "Italian",
      "dishType": "main_course",
      "duration": 60,
      "creator": "Chef Amanda"
    })
  })
  .then((created) => {
    console.log(created.title);
    return Recipe.insertMany(data);
  })
  .then(created => {
    console.log("recipes created");
  })
  .then(recipeUpdate => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((deleted) => {
    return Recipe.deleteOne({ title: "Carrot Cake"});
  })
  .then(() => {
    console.log("Recipe deleted");
    mongoose.connection.close(function() {
      console.log("Mongoose disconnected on app termination");
      process.exit(0);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
