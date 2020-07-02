const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
const cake = {
  title: "Cake",
  level: "Easy Peasy",
  ingredients: ["farine", "eggs", "milk", "sugar"],
  cuisine: "international",
  dishType: "breakfast",
};

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
    Recipe.create(cake)
      .then((dbRes) => {
        console.log(cake.title)
        Recipe.insertMany(data)
          .then((dbRes) => {
            data.forEach((recipe) => console.log(recipe.title))
            Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
              .then((dbRes) => {
                console.log("Updated", dbRes)
                Recipe.deleteOne({ title: "Carrot Cake" })
                  .then((dbRes) => {
                    console.log("Deleted", dbRes)
                    mongoose.connection.close(() => {
                      console.log('database closed')
                    })
                  })
              })
          })
        
      
      })
  })



  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
