const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    const input = {
      title: "Fake Recipe",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs",
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef Who",
    };

    return Recipe.create(input, (error, recipe) => {
      if (error) {
        console.log("An error happened:", error);
        return;
      }
      return console.log(
        "The recipe is saved and its value is: ",
        recipe.title
      );
    });
  })
  .then(() => {
    return Recipe.insertMany(data, (error, recipe) => {
      if (error) {
        console.log("An error happened:", error);
        return;
      }
      return recipe.forEach((recipe) => console.log(`${recipe.title}`));
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then(() => {
        return console.log("The recipe is updated for its duration");
      })
      .catch((error) => {
        return console.error("Error updating recipe", error);
      });
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => {
        return console.log(
          "The recipe is removed since it's no longer available"
        );
      })
      .catch((error) => {
        return console.error("Error removing recipe", error);
      });
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("closed the connection");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
