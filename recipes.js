const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./model/Recipe");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
    // ITERATION 2
    let recipe = new Recipe({
      title: "Brazillian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      cousine: "Asian",
      dishType: ["Dish"],
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu"
    });
    recipe.save(err => {
      if (err) {
        console.log(err);
      } else {
        // ITERATION 3
        Recipe.collection.insertMany(data, err => {
          if (err) {
            console.log(err);
          } else {
            //ITERATION 4
            Recipe.collection.update(
              { title: "Rigatoni alla Genovese" },
              { $set: { duration: 100 } },
              err => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Success");
                  //ITERATION 5
                  Recipe.collection.remove({ title: "Carrot Cake" }, err => {
                    if (err) {
                      return console.log(err);
                    } else {
                      mongoose.connection.close( () => console.log("Mongoose connection closed"))
                    }
                  });
                }
              }
            );
          }
        });
        console.log(recipe.title);
      }
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//
// )

//ITERATION 6
