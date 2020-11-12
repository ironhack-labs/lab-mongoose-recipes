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
  .then((result) => {
    // Run your code here, after you have insured that the connection was made
    const pr = Recipe.create({
      title: "Tiramisu",
      level: "UltraPro Chef",
      ingredients: [
        "4 large egg yolks",
        "½ cup/100 grams granulated sugar, divided",
        "¾ cup heavy cream",
        "1 cup/227 grams mascarpone (8 ounces)",
        "1 ¾ cups good espresso or very strong coffee",
        "2 tablespoons rum or cognac",
        "2 tablespoons unsweetened cocoa powder",
        "About 24 ladyfingers (from one 7-ounce/200-gram package)",
      ],
      cuisine: "Italian",
      dishType: "dessert",
      image:
        "https://static01.nyt.com/images/2017/04/05/dining/05COOKING-TIRAMISU1/05COOKING-TIRAMISU1-articleLarge.jpg",
      duration: 25,
      creator: "Chef Mirko",
    });
    return pr;
  })
  .then((created) => {
    console.log("Recipe created");
    const pr = Recipe.insertMany(data);
    return pr;
  })
  .then((createdMany) => {
    console.log("Recipes created:");
    createdMany.forEach((elem) => {
      console.log(elem.title);
    });
    const pr = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
    return pr;
  })
  .then((updateOne) => {
    console.log("Recipe updated");
    const pr = Recipe.deleteOne({ title: "Carrot Cake" });
    return pr;
  })
  .then((deleteOne) => {
    console.log("Recipe deleted");
    mongoose.connection.close(() => {
      console.log("Mongoose connection disconnected due to app termination");
    });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
