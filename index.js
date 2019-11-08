const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Recipe.create(data);

// Recipe.insertMany(data)
//   .then(recipe => {
//     recipe.forEach(item => {
//       console.log(item.title);
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Recipe.create({
//   title: "Carbonara",
//   level: "Easy Peasy",
//   ingredients: [
//     "2 pounds red onions, sliced salt to taste",
//     "2 (16 ounce) boxes uncooked rigatoni",
//     "1 tablespoon chopped fresh marjoram leaves",
//     "1 pinch cayenne pepper",
//     "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
//   ],
//   cuisine: "Italian",
//   dishType: "Dish",
//   image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
//   duration: 20,
//   creator: "Chef Shan"
// })
//   .then(recipe => {
//     console.log(recipe.title);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Recipe.findOneAndUpdate(
//   {
//     title: "Rigatoni alla Genovese"
//   },
//   { duration: 100 },
//   { new: true }
// )
//   .then(recipe => {
//     console.log(
//       "The duration of:" + recipe.title + "is updated to:" + recipe.duration
//     );
//   })
//   .catch(err => console.log(err));

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(doc => {
    console.log(doc);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
