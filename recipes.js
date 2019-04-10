const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");

    //Iteration 1:
    const recipeSchema = new Schema({
      title: { type: String },
      level: {
        type: String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
      },
      ingredients: { type: Array },
      cuisine: { type: String, required: true },
      dishType: {
        type: String,
        enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
      },
      image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
      },
      duration: { type: Number, min: 0 },
      creator: { type: String },
      created: { type: Date, default: Date.now }
    });

    const Recipe = mongoose.model("Recipe", recipeSchema);
    module.exports = Recipe;

    //Iteration 2
    Recipe.create({
      title: "Real Giuseppe Homemade Pizza Dough",
      level: "Amateur Chef",
      ingredients: [
        "Water",
        "Flour",
        "Yeast",
        "Salt",
        "Extra Virgin Oil",
        "Sugar"
      ],
      cuisine: "Italian",
      dishType: "Dish",
      image:
        "https://www.tribugolosa.com/media/slide-450-8_crop.jpg/rh/pasta-per-la-pizza.jpg",
      duration: 25,
      creator: "Giuseppe 'Il maestro de la Pizza' Locanto"
    }).then(recipe => {
      console.log(recipe.title);

      //Iteration 3:
      Recipe.insertMany(data).then(recipes => {
        recipes.forEach(recipe => {
          console.log(recipe.title);
        });

        //Iteration 4:
        Recipe.updateOne(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        ).then(recipe => {
          console.log(
            `Duration of ${recipe.title} successfully updated to 100`
          );

          //Iteration 5:
          Recipe.deleteOne({ title: "Carrot Cake" }).then(recipe => {
            console.log(
              `Recipe of ${recipe.title} has been successfully removed`
            );
            //Iteration 6:
            mongoose.connection.close(() => {
              console.log("Connection with mongoose closed");
            });
          });
        });
      });
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
