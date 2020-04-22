const mongoose = require("mongoose");
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const newRecipe = {
  title: "White Wine Coq Au Vin",
  level: "Easy Peasy",
  ingredients: [
    "2 tsp. olive oil",
    "4 oz. pancetta, cut into 1/2-inch pieces",
    "1 (3 1/2- to 4-pound) whole chicken, cut into 10 pieces",
    "Kosher salt and freshly ground black pepper",
    "1 lb. cremini mushrooms, quartered",
    "2 medium onions, chopped",
    "2 leeks (white and light green parts only), halved and sliced",
    "2 cloves garlic, chopped",
    "2 tbsp. all-purpose flour",
    "1 (750-milliliter) bottle dry white wine",
    "1/2 c. chicken stock",
    "2 tbsp. Dijon mustard",
    "6 sprigs thyme",
    "2 bay leaves",
    "1/4 c. fresh tarragon, chopped",
  ],
  cuisine: "French",
  dishType: "main_course",
  image:
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/white-wine-coq-au-vin-1586056485.jpg?crop=0.839xw:1.00xh;0.128xw,0&resize=768:*",
  duration: 120,
  creator: "Fany",
};

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    //Iteration 2 - Create a recipe
    Recipe.create(newRecipe).then((recipe) =>
      console.log(`A new recipe was created: ${recipe.title}`)
    );
  })
  .then(() => {
    //Iteration 3 - Insert multiple recipes
    Recipe.insertMany(data).then((recipes) =>
      recipes.forEach((recipe) => {
        console.log(`A new recipe was created: ${recipe.title}`);
      })
    );
  })
  //Iteration 4 - Update recipe
  .then(() => {
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then(console.log("The duration fiel was successfully updated!"));
  })
  //Iteration 5 - Remove a recipe
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" }).then(
      console.log("recipe deleted successfully")
    );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  //Iteration 6 - Close the Database
  .finally(() => {
    mongoose.disconnect();
  });
