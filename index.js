const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const { update } = require("./models/Recipe.model");

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
        return Recipe.create(data[0])
    })
    .then((resultCreate)=>{
        console.log(resultCreate)
        return Recipe.insertMany(data)
    })
    .then((resultInsertAll)=>{
        console.log(resultInsertAll) // c'est le résultat du insertMany 
        return Recipe.findOneAndUpdate(
            { title: "Rigatoni alla Genovese" },
            { duration: "100" },
            { new: true }
          );
    })
    .then((resultUpdate)=>{
        console.log(resultUpdate);
        return Recipe.findOneAndDelete({title: "Carrot Cake"});
        
        
    })
    .then((resultDelete)=>{
        console.log(resultDelete);
        
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
    });
    