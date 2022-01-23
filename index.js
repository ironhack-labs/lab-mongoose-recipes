const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured tat the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  const recipe = {
    title: "Instant Pot Chicken and Dumplings",
    level: "Amateur Chef",
    ingredients: [
      "tablespoon olive oil",
      "cup diced onion",
      "cup diced carrot",
      "cup diced celery",
      "bay leaf",
      "cups low-sodium chicken broth",
      "pound boneless, skinless chicken thighs",
      "pound bone-in chicken breasts, skin removed",
      "teaspoon thyme (Optional)",
      "teaspoon dried marjoram",
      "teaspoon salt (Optional)",
      "teaspoon freshly ground black pepper",
      "tablespoons unsalted butter, softened",
      "tablespoons all-purpose flour",
      "salt and ground black pepper to taste",
      "cup frozen petite peas",
      "cup frozen cut green beans"
    ],
    cuisine: "Asian",
    dishType: "main_course",
    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9411429.jpg&q=85",
    duration: 60,
    creator: "Doughgirl8",
  };
  
  
  Recipe.create(recipe)
    .then((recipe) => console.log("Recipe was create with title: ", recipe.title))
    .catch((error) =>
      console.log("An error happened while saving a new recipe:", error)
    );
  
  Recipe.insertMany(data)
    .then((recipes) =>
      recipes.forEach((recipe) => console.log("Recipe title:", recipe.title))
    )
    .catch((error) =>
      console.log("An error happened while saving a new recipes:", error)
    );
  
  Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then((recipe) => console.log("Updated Recipe"))
    .catch((error) => console.log("Was not able to update recipe:", error));
  
  Recipe.deleteOne({ title: "Carrot Cake" })
    .then(() => console.log("Removed Recipe"))
    .catch((error) => console.log("Was not able to remove recipe:", error));
  
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });
  
