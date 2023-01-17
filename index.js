const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
.connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  // Run your code here, after you have insured that the connection was made
  .then(() => {
    Recipe.create({
      title: "Chocolate fudge cake",
      level: "Easy Peasy",
      ingredients: [
        "150ml sunflower oil, plus extra for the tin",
        "175g self-raising flour",
        "2 tbsp cocoa powder",
        "1 tsp bicarbonate of soda",
        "150g caster sugar",
        "2 tbsp golden syrup",
        "2 large eggs, lightly beaten",
        "150ml semi-skimmed milk",
      ],
      cousine: "USA",
      dishType: "dessert",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chocolate-fudge-cake-91de17a.jpg?quality=90&webp=true&resize=220,200",
      duration: 30,
      creator: "Misskay",
    })
      .then((recipe) => {
        console.log("Add recipe of", recipe.title);

        Recipe.insertMany(data)
          .then((data) => {
            console.log(
              "Repices were added",
              data.map((recipe) => recipe.title).join(", ")
            );

            Recipe.findOneAndUpdate(
              { title: "Rigatoni alla Genovese" },
              { duration: 100 }
            )
              .then(() => {
                console.log("Updated");
                Recipe.deleteOne({ title: "Carrot Cake" })
                  .then(() => {
                    console.log("Deleted");
                    mongoose.disconnect()
                    
                  })
                  .catch((error) => {
                    console.error("error deleting", error);
                  });
              })
              .catch((error) => {
                console.error("Error upadating", error);
              });
          })
          .catch((error) => {
            console.error("Error inserting data", error);
          });
      })
      .catch((error) => {
        console.error("Error adding individual recipe", error);
      });
      
  });
