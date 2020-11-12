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
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Fish pie",
      level: "Easy Peasy",
      ingredients: [
        "Fish filets",
        "Potatoes",
        "Milk",
        "Salt",
        "Pepper",
        "Butter",
        "Cheddar",
      ],
      cuisine: "International",
      dishType: "main_course",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwES3x1LnAtNPusRrU4oIXzTD3B90YSvQZig&usqp=CAU",
      duration: 90,
      creator: "Ottolenghi",
    });
  })
  .then(() => {
    //importing an array of recipes form the data.json file:
    // console.log(data);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((recipe) => {
      // console.log(recipe.title);
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then(() => {
      console.log("updated");
    });
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
      console.log("deleted");
    });
  })
  .then(() => {
    mongoose.connection.close().then(() => {
      console.log("connection closed");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
