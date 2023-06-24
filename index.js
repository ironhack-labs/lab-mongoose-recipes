const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

let newRecipe = {
  title: "miXto quente",
  level: "Easy Peasy",
  ingredients: ["pão francês", "queijo", "presunto"],
  cuisine: "Brasileira",
  dishType: "snack",
  image:
    "http://culinaria.culturamix.com/blog/wp-content/gallery/misto-quente-3/Misto-Quente-6.jpg",
  duration: 5,
  creator: "JOC",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return Recipe.deleteMany();
  })
  .then(() => {
    // iteration 2. newRecipe will be created in our DB
    return Recipe.create(newRecipe); // returning the promise allows us to resolve it in the next .then(), instead of nested promises.
  })
  .then((result) => {
    console.log(`recipe added: ${result.title}`); // a console.log to verify previous promise resolved correctly
    // iteration 3. all recipes in data will be inserted in our DB
    return Recipe.insertMany(data);
  })
  .then((result) => {
    result.forEach((item) =>
      console.log(`recipe for ${item.title} inserted successfully`)
    ); // a console.log to verify previous promise resolved correctly
    // iteration 4. To find a recipe by its title and update one attribute
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((result) => {
    console.log(`The recipe ${result.title} is updated`); // a console.log to verify previous promise resolved correctly
    // iteration 5. To find a recipe by its title and delete it
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then((result) => {
    console.log(`The recipe ${result.title} is deleted`); // a console.log to verify previous promise resolved correctly
    // iteration 6. To close the DB.
    return mongoose.connection.close();
  })
  .then(() => console.log(`connection closed`)) // a console.log to verify previous promise resolved correctly
  .catch((err) => console.log(`an error has occurred: ${err}`)); // to catch errors in promises

app.listen(3000, () => {
  console.log("Engine started");
});
