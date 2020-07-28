const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const empanadas = {
  title: "Empanadas Argentinas",
  level: "Amateur Chef",
  ingredients: ["carne picada", "huevo duro", "cebolla", "sal", "aceitunas", "tapas para empanadas"],
  cuisine: "Argentina",
  dishType: "other",
  image: "",
  duration: 60,
  creator: "Natalia",
};

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {

    // Run your code here, after you have insured that the connection was made
    Recipe.create(empanadas)
      .then((response) =>
        console.log(`The title of the recipe is ${response.title}`, response)
      )
      .catch((error) => {
        console.error("Error creating recipe", error);
      });

    Recipe.insertMany(data)
      .then((response) =>
        response.forEach((recipe) => {
          console.log(recipe);
        })
      )
      .catch((err) => console.error("Error insertMany", err));

  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

  Recipe.findOneAndUpdate(
    { title: 'Rigatoni alla Genovese' }, 
    { duration: 100 },
    { new: true }
  )
    .then((response) => console.log("Updated successfully!", response))
    .catch((err) => console.error("Error insertMany", err));

  Recipe.deleteOne(
    { title: "Carrot Cake" }
  )
    .then((response) => console.log("Deleted successfully!", response))
    .catch((err) => console.log(err));