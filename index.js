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
  .then(async () => {
    const banana = await Recipe.create({
      title: "Banana Bread",
      level: "Amateur Chef",
      ingredients: [
        `3 bananas`,
        `100g of sugar`,
        `15g of almond powder`,
        `one pinch of salt`,
        `2g of cinnamon`,
        `3g of ginger`,
        `1 teaspoon of vanilla`,
        `60g of a neutral oil`,
        `165g of flour`,
        `5g of baking powder`,
      ],
      cuisine: "Vegan",
      dishType: "dessert",
      image: "./images/banana-bread.jpg",
      duration: 60,
      creator: "Chacha",
    });
    console.log(banana.title);
    await Recipe.insertMany(data);
    data.forEach((element) => console.log(element.title));
  })
  .then(async () => {
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };
    await Recipe.findOneAndUpdate(filter, update);
    console.log("Duration updtated");
  })
  .then(async () => {
    await Recipe.deleteOne({
      title: "Carrot Cake",
    });
    console.log("Carrot Cake successfully removed");
  })
  .then(async () => {
    await mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
