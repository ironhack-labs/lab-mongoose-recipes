const mongoose = require('mongoose');

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
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
    // Run your code here, after you have insured that the connection was made
    //Iteration 2 - Create a recipe
    return Recipe.create({
      title: "Chocolate Chip Cookies",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup light brown sugar",
        "1 large egg",
        "2 tablespoons milk",
        "1 1/4 teaspoons vanilla extract",
        "2 cups semisweet chocolate chips",
      ],
      cuisine: "French",
      dishType: "dessert",
      image:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85",
      duration: 30,
      creator: "Chef Jennifer",
    });
  })
  .then((recipe) => {
    console.log("one recipe created", recipe.title);
  })
  .then(() => {
    //Iteration 3 - Insert multiple recipes
    return Recipe.create([...data]);
  })
  .then((recipe) => {
    recipe.forEach((e) => console.log("recipe created:", e.title));
  })
  .then(() => {
    //Iteration 4 - Update recipe
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((recipe) => {
    console.log("recipe updated successfully", recipe);
  })
  .then(() => {
    //Iteration 5 - Remove a recipe
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((recipe) => {
    console.log("recipe deleted successfully", recipe);
  })
  .catch((error) => {
    console.error("Error", error);
  })
  .finally(() => {
    //Iteration 6 - Close the Database
    mongoose.disconnect();
  });
