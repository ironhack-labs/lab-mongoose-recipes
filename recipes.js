const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
    .connect("mongodb://localhost/recipeApp")
    .then(() => {
        console.log("Connected to Mongo!");
    })
    .catch(err => {
        console.error("Error connecting to mongo", err);
    });

const recipeSchema = new mongoose.Schema({
    title: String,
    level: String,
    ingredient: [String],
    cusine: String,
    dishType: String,
    image: String,
    duration: Number,
    creator: String,
    created: Date
});

const Recipe = mongoose.model("Recipe", recipeSchema);

//const myRecipe = new Recipe({
//  title: "cake",
//level: "Easy Peasy",
//ingredient: ["Chocolate", "flour", "egg"],
//     cuisine: "french",
//     dishType: "dessert",
//     image: "cake.jpeg",
//     duration: 12,
//     creator: "Anais",
//     created: new Date()
// });

// myRecipe
//     .save()
//     .then(result => console.log("saved recipe"))
//     .catch(console.error);

// Recipe.insertMany(data)
//     .then(result => console.log("saved recipe"))
//     .catch(console.error);

// Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true }).then(
//     result => {
//         console.log(result);
//     }
// );

Recipe.deleteOne({ title: "Carrot Cake" })
    .then(result => console.log("success"))
    .catch(console.error);

mongoose.connection.close();

Recipe.deleteOne({ title: "Asian Glazed Chicken Thighs" })
    .then(result => console.log("success"))
    .catch(console.error);
