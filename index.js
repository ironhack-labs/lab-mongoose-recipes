const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose.set('strictQuery', true);

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then( async () => {
    let recipe = await Recipe.create(
      {
        title: "Potato soup",
        cuisine: "german",
        level: "Amateur Chef",
        ingredients: [
          "1kg Potatoes",
          "3 carrots",
          "1 tbs salt",
          "1 teaspoon pepper",
          "1 tbs garlic powder",
          "1 tbs vegetable broth powder",
        ],
        dishType: "main_course",
        image:
          "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        duration: 60,
        creator: "Chef Pauli",
      },
    );
    console.log(recipe.title)
  })
  .then(async () => {
    let documents = await Recipe.insertMany(data);
    documents.forEach(document => console.log(document.title))
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
