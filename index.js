require("./config/db.config");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const allRecipesData = require("./data.json");

// Connect to Database?
mongoose.connection.once("open", () => {
  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log("database ripped out"))
    .then(() => {
      return Promise.all([Recipe.insertMany(allRecipesData)]);
    })
    .then(() => {
      return Recipe.find();
    })
    .then((recipeRes) => {
      recipeRes.forEach((res, i) => {
        console.log(`Recipe ${i + 1} ->`, res.title);
      });
      return Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      );
    })
    .then((res) => {
      console.log(
        `${res.title} has been updated with the time of ${res.duration}`
      );
      return Recipe.findOneAndDelete({ title: "Carrot Cake" });
    })
    .then((deletedDoc) => {
      console.log(`${deletedDoc.title} has been deleted`);
      return Recipe.find();
    })
    .then((newRecipeList) => {
      console.log(`Updated List:`);
      newRecipeList.forEach((res, i) => {
        console.log(`Recipe ${i + 1} ->`, res.title);
      });
    })
    .then(() => {
      return Recipe.countDocuments();
    })
    .then((res) => {
      console.log(`closing connection with ${res} recipes remaining`);
      mongoose.connection.close();
    });
});

// const allRecipes = [
//   {
//     title: "Calvin's Cake",
//     level: "Hard",
//     ingredients: ["flour", "apples", "milk", "eggs"],
//     cuisine: "HomeMade",
//     dishType: "Dessert",
//     image:
//       "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.TOHEfukFtd68jFz3pgPy0AHaKa%26pid%3DApi&f=1",
//     duration: 20,
//     creator: "Calvin T",
//     created: new Date(),
//   },
//   {
//     title: "Calvin's Pie",
//     level: "Easy",
//     ingredients: ["Chicken", "eggs"],
//     cuisine: "Invented",
//     dishType: "Main",
//     image:
//       "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fkitchensanctuary.com%2Fwp-content%2Fuploads%2F2016%2F01%2FCreamy-Chicken-Pie-square1.jpg&f=1&nofb=1",
//     duration: 15,
//     creator: "Calvin T",
//     created: new Date(),
//   },
// ];

// const recipe = new Recipe(allRecipesData);
