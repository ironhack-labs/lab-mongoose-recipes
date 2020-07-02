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
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // LET'S CREATE THE WONDERFUL AND MUST-HAVE GLASS OF WATER RECIPE
    Recipe.create({
      title: "glass of water",
      level: "Easy Peasy",
      ingredients: ["water", "ice cubes"],
      cuisine: "world",
      dishType: "drink",
      duration: 5,
      creator: "a genius",
    })
      .then((dbRes) => {
        console.log(`${dbRes.title} recipe added.`);


        // THEN - LET'S ADD ALL THE RECIPES IN DATA.JSON
        Recipe.insertMany(data)
          .then((dbRes) => {
            dbRes.forEach((recipe) => {
              console.log(recipe.title);
            });

            // THEN - LET'S UPDATE THE RIGATONI'S DURATION
            Recipe.findOneAndUpdate(
              { name: "Rigatoni alla Genovese" },
              { duration: 100 }
            )
              .then((dbRes) => {
                console.log(`Rigatoni Recipe update is a success !`);

                // THEN - LET'S REMOVE THE CARROT CAKE (it's a lie)
                Recipe.deleteOne({ name: "Carrot Cake" })
                  .then((dbRes) => {
                    console.log(`deletion of Carrot Cake complete`);

                    // THEN & AT LAST - LET'S END THE DB CONNEXION
                    mongoose.connection
                      .close()
                      .then((endRes) => {
                        console.log(`DB closed`);
                      })

                      
                      .catch((endErr) => {
                        console.error(endErr);
                      });
                  })
                  .catch((dbErr) => {
                    console.error(dbErr);
                  });
              })
              .catch((dbErr) => {
                console.error(dbErr);
              });
          })
          .catch((dbErr) => {
            console.error(dbErr);
          });
      })

      .catch((dbErr) => {
        console.error(dbErr);
      });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
