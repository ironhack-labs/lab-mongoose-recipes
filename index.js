const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const ownRecipe = {
  title: "Laura Todd's cookies",
  level: "Easy Peasy",
  ingredients: [
    "250g of butter",
    "350g of cane sugar",
    "375g of flour",
    "350g of chocolat chip",
    "1 egg",
    "1/2 vanilla sugar",
  ],
  cuisine: "American",
  dishType: "dessert",
  image:
    "https://image.shutterstock.com/z/stock-photo-chocolate-cookies-on-wooden-table-661622035.jpg",
  duration: 35,
  creator: "Laura Todd",
};

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
    const recipe = await Recipe.create(ownRecipe);
    console.log(recipe.title);
  })

  .then(async () => {
    Recipe.insertMany(data);
    data.forEach((item) => {
      console.log(item.title);
    });
  })

  .then(async () => {
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };
    await Recipe.findOneAndUpdate(filter, update);
    console.log("Success!");
  })

  .then(async () => {
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Yes!");
  })

  .then(async () => {
    await mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
