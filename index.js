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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: "Mousse au chocolat",
      level: "Amateur Chef",
      ingredients: [
        "oeuf",
        "chocolat noir",
        "creme liquide",
        "sucre",
        "arôme vanille",
      ],
      dishType: "dessert",
      image: "",
      duration: 60,
      creator: "Mad Chef",
      created: "",
    });
  })
  
  .then((newrecipe) => {
    console.log(newrecipe.title);
    return Recipe.insertMany(data);
  })

  .then((insert) => {
    insert.forEach((re) => console.log(re.title));
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })

  .then((update) => {
    console.log(update.title);
    return Recipe.deleteOne({
      title: "Carrot Cake",
    });
  })

  .then(() => {
    console.log(`Carrot cake is not available`);

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
