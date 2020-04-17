const mongoose = require("mongoose");

/** handling Deprecation Warnings **/
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
//mongoose.set("useUnifiedTopology", true);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
// set address
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

  //Iteration 2 - Create a recipe
  // BASIC STRUCTURE: >> Recipe.STATIC({...}).then(console.log(..)).then(() => {>> NEXT Recipe.STATIC...}).catch();

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "French Creps",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup flour",
        "1 large egg",
        "2 tablespoons milk",
        "1 1/4 teaspoons vanilla extract",
      ],
      cuisine: "French",
      dishType: "dessert",
      image:
        "https://www.google.es/imgres?imgurl=https%3A%2F%2Fimagesvc.meredithcorp.io%2Fv3%2Fmm%2Fimage%3Furl%3Dhttps%253A%252F%252Fassets.marthastewart.com%252Fstyles%252Fwmax-750%252Fd39%252Fcrepes-recipe-0419-9085-lw-076-0746463d%252Fcrepes-recipe-0419-9085-lw-076-0746463d_horiz.jpg%253Fitok%253Dhz2JsqRE&imgrefurl=https%3A%2F%2Fwww.marthastewart.com%2F335089%2Fsimple-crepes&tbnid=PIYbJCtjEckcCM&vet=12ahUKEwjojZC0ju_oAhVMO-wKHfE9AlEQMygHegUIARDxAg..i&docid=NPZOip2yXrO4fM&w=750&h=422&q=crepes&ved=2ahUKEwjojZC0ju_oAhVMO-wKHfE9AlEQMygHegUIARDxAg",
      duration: 20,
      creator: "Chef Marie",
    });
  })
  .then((recipe) => {
    console.log("one recipe created", recipe.title);
  })

  //Iteration 3 - Insert multiple recipes
  .then(() => {
    return Recipe.create([...data]);
  })
  .then((recipe) => {
    recipe.forEach((e) => console.log("recipe created:", e.title));
  })

  //Iteration 4 - Update recipe
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Asian Glazed Chicken Thighs" },
      { duration: 300 },
      { new: true }
    );
  })
  .then((recipe) => {
    console.log("recipe updated successfully", recipe);
  })

  //Iteration 5 - Remove a recipe
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((recipe) => {
    console.log("recipe deleted successfully", recipe);
  })
  .catch((error) => {
    console.error("Error", error);
  })

  //Iteration 6 - Close the Database
  .finally(() => {
    mongoose.disconnect();
  });
