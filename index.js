const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
mongoose
    .connect(MONGODB_URI)
    .then((x) => {
        console.log(`Connected to the database: "${x.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany();
    })
    .then(() => {
        let recipe1 = {
            title: " cake",
            level: "Amateur Chef",
            dishType: "snack",
            duration: 25,
            cuisine: "Asian",
        };

        Recipe.create(recipe1)
            .then((newRecipe) => console.log(newRecipe))
            .catch((error) => {
                console.error("Error creating recipe", error);
            });

        Recipe.insertMany(data)
            .then((newData) => {
                console.log(newData);
                Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
                    .then((updtedRecipe) => console.log(updtedRecipe))
                    .catch((err) => {
                        console.error(err);
                    });
                Recipe.deleteOne({ title: "Carrot Cake" })
                    .then((deleteRecipe) => console.log(deleteRecipe))
                    .catch((err) => {
                        console.error(err);
                    });
            })

        .catch((error) => {
            console.error("Error importing data", error);
        });
    })

.catch((error) => {
    console.error("Error connecting to the database", error);
});


mongoose.disconnect(() => console.log("Disconnected"));