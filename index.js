const mongoose = require("mongoose");

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
    .then((step1) => {
        // Run your code here, after you have insured that the connection was made
        console.log(step1);

        return Recipe.insertMany(data);
    })
    .then((step2) => {
        console.log(step2);

        return Recipe.findOneAndUpdate(
            { title: "Rigatoni alla Genovese" },
            { duration: 100 },
            { returnDocument: "after" }
        );
    })
    .then((step3) => {
        console.log(
            `The duration of Rigatoni alla Genovese is updated to 100 succesfully. for more info: ${step3}`
        );

        return Recipe.deleteOne({ title: "Carrot Cake" });
    })
    .then((step4) => {
        console.log(
            `The Carrot Cake is deleted succesfully. for more info: ${step4}`
        );
        return mongoose.connection.close();
    })
    .then((step5) => {
        console.log(`mongoose disconnected successfully: ${step5}`);
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
    });
