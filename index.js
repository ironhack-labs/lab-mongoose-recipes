const mongoose = require("mongoose");

require("./config/db.config");

const Recipe = require("./models/Recipe.model");

const data = require("./data");

mongoose.connection.once("open", () => {
  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log("Consola has been cleared"))
    .then(() => {
      const newRecipe = {
        title: "Pan fried tofu",
        level: "Easy Peasy",
        ingredients: [
          "1 (16 ounce) package water-packed firm tofu, drained and rinsed",
          "6 tablespoons nutritional yeast",
          "½ teaspoon garlic powder, or to taste (Optional)",
          "salt and ground black pepper to taste",
          "1 ½ tablespoons olive oil",
        ],

        cuisine: "Plant based",
        dishType: "main_course",
        duration: 20,
        creator: "Chef María",
      };

      const promise1 = Recipe.create(newRecipe);
      const promise2 = Recipe.insertMany(data);

      return Promise.all([promise1, promise2])
      .then(
        promise2.forEach = () => {
          for(let i = 0; i < data.length; i++) {
           console.log(`${data[i].title}`)
          }
          console.log(`New recipe ${newRecipe.title} sucessfully created`);
        }
        
      )

    .catch((err) => console.log(err))
    .finally(() => mongoose.connection.close());
  }) 

})

