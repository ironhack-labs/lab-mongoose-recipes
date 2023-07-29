const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(MONGODB_URI)
    .then((x) => {
      console.log(`Connected to the database: "${x.connection.name}"`);
      // Before adding any recipes to the database, let's remove all existing ones
      return Recipe.deleteMany();
    })
    .then(() => {
      // Run your code here, after you have insured that the connection was made
      Recipe.insertMany(data).then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          {
            new: true,
          }
        ).then(() => {
          console.info("RECIPE UPDATE!!");
        });
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(() => {
            console.info("RECIPE DELETE!!");
          })
          .finally(() => {
            mongoose.connection.close();
          });
      });
    })
    .catch((error) => {
      console.error("Error connecting to the database", error);
    });
}
