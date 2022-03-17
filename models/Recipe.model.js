const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [String],
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: [
      "breakfast",
      "main_course",
      "soup",
      "snack",
      "drink",
      "dessert",
      "other",
    ],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

// // Mongoose allows us to use a callback pattern
// // to handle the completion of the asynchronous operation
// User.create(data, (error, user) => {
//   if (error) {
//     console.log('An error happened:', error);
//     return;
//   }
//   console.log('The user is saved and its value is: ', user);
// });

// // The same code as above but with a Promise version
// User.create(data)
//   .then(user => console.log('The user is saved and its value is: ', user))
//   .catch(error => console.log('An error happened while saving a new user:', error));
