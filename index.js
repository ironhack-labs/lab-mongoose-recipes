const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  // elimino los datos
  .then(() => {
    return Recipe.deleteMany({}, err => {
      console.log("deleted");
    });
  })
  .then(() => {
    const RecetaOne = {
      title: "Pan con tomate",
      level: "Easy Peasy",
      ingredients: ["Pan", "Tomnate", "Aceite"],
      cuisine: "Catalana",
      dishType: "Others",
      image: "default",
      duration: 5,
      creator: "Daniel Baenas",
      created: Date.Now
    };

    return Recipe.create(RecetaOne);
  })

  //inserto multiples
  .then(() => {
    return Recipe.insertMany(data);
  })
  //Update time rigatone
  .then(() => {
    return Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
