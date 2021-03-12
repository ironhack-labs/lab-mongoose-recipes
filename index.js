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
        useFindAndModify: false,
    })
    .then((self) => {
        console.log(`Connected to the database: "${self.connection.name}"`);
        // Before adding any documents to the database, let's delete all previous entries
        return self.connection.dropDatabase();
    })
    .then(() => {
        return Recipe.create({
            title: "Bulgur Salad",
            level: "Easy Peasy",
            ingredients: [
                "Bulgur",
                "Tomato Paste",
                "Cucumber",
                "Parsley",
                "Tomato",
                "Spices",
                "Dill",
                "Onion",
            ],
            cuisine: "Turkish",
            dishType: "other",
            image: "https://images.media-allrecipes.com/images/75131.jpg",
            duration: 30,
            creator: "All Grandmothers",
        }).then((bulgurSaladRecipe) =>
            console.log(
                "Grandma's super secret recipe is: ",
                bulgurSaladRecipe.title
            )
        );
    })
    .then(() => {
        return Recipe.insertMany(data);
    })
    .then((recipeTitles) =>
        recipeTitles.forEach((titles) =>
            console.log("Title is: ", titles.title)
        )
    )
    .then(() => {
        return Recipe.findOneAndUpdate(
            { title: "Rigatoni alla Genovese" },
            { $set: { duration: 100 } },
            { new: true }
        );
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
    });
