const mongoose = require("mongoose");
const express = require("express");
// const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./models/RecipeConstr");
// const path = require("path");

const app = express();

mongoose
    .connect(
        "mongodb://localhost/recipeApp",
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log("Connected to Mongo!");
    })
    .catch(err => {
        console.error("Error connecting to mongo", err);
    });

app.get("/create-recipe", (req, res) => {
    // res.send(data);
    const newRecipe = new Recipe({
        title: "Spaghetti",
        level: "Easy Peasy",
        ingredients: ["blood and sweat"],
        cousine: "Italian",
        dishType: ["Snack"],
        duration: 42,
        creator: "Chef Jason"
    });
    Recipe.create(newRecipe).then(result => {
        res.send(result);
    });
});

app.get("/many-recipes", (req, res) => {
    res.send(data);
    const newRecipe = new Recipe({});
    Recipe.insertMany(data)
        .then(result => {
            console.log(result);
            res.send(result);
        })
        .catch(err => {
            console.error(err);
            res.send("Something went wrong!");
        });
});

app.get("/update-rigatoni", (req, res) => {
    Recipe.findByIdAndUpdate("5b7e9f8d0409c60a429850db", { duration: 100 }, { new: true }).then(dur => {
        res.send(dur);
    });
});

app.get("/no-carrot", (req, res) => {
    Recipe.findByIdAndRemove("5b7e9f8d0409c60a429850da").then(result => {
        res.send(result);
    });
});

// closing database
process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Disconnected");
        process.exit(0);
    });
});

app.listen(3000);
