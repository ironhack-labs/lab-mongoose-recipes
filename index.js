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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  //Iteration 1
  .then(() => {
    return Recipe.create({
      title: "Pasta",
      level: "Easy Peasy",
      ingredients: ["pasta", "pomodoro"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 20,
      creator: "Luis&Luca",
      created: new Date(),
    });
  })
  //Iteration 2
  .then((recipe) => {
    console.log(recipe.title);
    //Iteration 3
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.find();
  })
  .then((recipes) => {
    recipes.forEach(element => console.log(element.title));
  })
  //Iterastion 4
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  //Iteration 5
  .then(() => {
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then((deletedRecipe) => {
    console.log("This recipe has been deleted:", deletedRecipe);
  })
  //Iteration 6
  .then(() => {
    return mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
