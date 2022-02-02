const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    return Recipe.create(data);
  })

  .then((allcreatedrecipes) => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese", duration: 220 },
      { title: "Rigatoni alla Genovese", duration: 100 }
    );
  })

  .then((deletecarrotcake) => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((recipes) => console.log(`titulo ${recipes}`))
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

mongoose.connection.close(() => {
  console.log(
    "Mongoose default connection disconnected through app termination"
  );
  process.exit(0);
});

//   level: "Amateur Chef", //   title: "Red Velvet", // .create({
//   ingredients: [
//     "cake flour",
//     "cocoa powder",
//     "baking soda",
//     "salt",
//     "butter",
//     "granulated sugar",
//     "canola",
//     "red food color",
//     "pure vanilla extract",
//     "distilled white vinegar",
//     "buttermilk",
//     "cream cheese",
//   ],
//   cuisine: "African American",
//   dishType: "dessert",
//   image:
//     "https://www.recetassinlactosa.com/wp-content/uploads/2019/02/Tarta-red-velvet-2.jpg",
//   duration: 120,
//   creator: "Estefanía",
// })
// .then(dessert=>console.log(`titulo ${dessert.title}`))
// .catch((error) => {
//   console.error("Error connecting to the database", error);
// });
