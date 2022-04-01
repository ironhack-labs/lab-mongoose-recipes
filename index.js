const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI =
  "mongodb+srv://jucimeirecarvalho:mari1234@cluster0.gt7zq.mongodb.net/lab-mongoose-recipes?retryWrites=true&w=majority";
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.create({
      title: "Brigadeiro",
      level: "Easy Peasy",
      ingredients: ["leite condensado", "creme de leite", "cacau em pó"],
      cusine: "Brasileiro",
      dishType: "dessert",
      duration: 20,
      creator: "Jucimeire Carvalho",
    })
      .then((result) => console.log(result.title))
      .catch((error) => console.log(error));

    Recipe.insertMany(data)
      .then((result) => {
        result.forEach((item) => {
          console.log(item.title);
        });
      })
      .catch((error) => console.log(error));

    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } 
    })
      .then((result) => console.log(result.title))
      .catch((error) => console.log(error));

    Recipe.deleteOne({ title: "Carrot Cake" })
      .then((result) => console.log(result.title))
      .catch((error) => console.log(error));
  })

    

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
