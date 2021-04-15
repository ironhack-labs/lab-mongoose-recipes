const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    /* Run your code here, after you have insured that the connection was made 
      Recipe.create({
      title: "ceviche",
      level: "UltraPro Chef",
      ingredients: [
        "1 kg fish",
        "6 lemons",
        "two purple onions",
        "yellow pepper",
      ],
      cuisime: "Peru",
      dishType: "main_course",
      duration: 30,
      creator: "Junior",
      created: "15 abril",
    })
      .then((result) => {
        console.log(result.title);
      })
      .catch((err) => {
        console.log(err);
      }); */

    Recipe.insertMany(data).then((result) => {
      result.forEach((recipe) => {
        console.log(recipe.title);
      });

      Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      ).then((result) => {
        console.log("Change made"); /* , result) */
        Recipe.deleteOne({ title: "Carrot Cake" }).then((result) => {
          console.log(result);
          mongoose.connection.close().then(() => {
            console.log("Closed");
          });
        });
      });
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
