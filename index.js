const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

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
    // Run your code here, after you have insured that the connection was made
    // Iteration 2 - Create a recipe
    return Recipe.create({
      title: "Receta de Paella de marisco",
      level: "Easy Peasy",
      ingredients: [
        "350 g de arroz bomba",
        "2 calamares",
        "8 mejillones",
        "8 langostinos",
        "1 puerro",
        "1 cebolleta",
        "100 ml de salsa de tomate",
        "75 ml de txakoli",
        "1l de caldo para paella",
        "aceite de oliva virgen extra",
        "sal",
        "unas hebras de azafrán",
        "1 limónperejil",
      ],
      cuisine: "Spanish",
      dishType: "main_course",
      image:
        "https://www.hogarmania.com/archivos/201706/paella-marisco-pinterest-XxXx80.jpg",
      duration: 45,
      creator: "Karlos Arguiñano",
    });
  })

  // Iteration 2 - Console.log the title of the recipe
  .then((recipe) => {
    console.log("one recipe created", recipe.title);
  })

  //Iteration 3 - Insert multiple recipes

  .then(() => {
    return Recipe.insertMany(data);
  })

  .then((recipe) => {
    recipe.forEach((e) => console.log("recipe created:", e.title));
  })

  //Iteration 4 - Update recipe

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
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

  //Iteration 6 - Close the Database

  .then(() => {
    mongoose.connection.close();
  })

  .then(() => {
    console.log("connection closed successfully");
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
