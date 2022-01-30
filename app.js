const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(()=>{
     return (Recipe.insertMany(data));
  })
  .then((insertedRecipies)=>{
    for (let i = 0; i < insertedRecipies.length; i++) {
        console.log("those are the new recipes:" + insertedRecipies[i].title);
      }
      return (Recipe.findOneAndUpdate(  { title: "Rigatoni alla Genovese" },
      { duration: 100 }));
  })
  .then(()=>{
      console.log("Rigatoni has been updated");
  return (Recipe.deleteOne({ title: "Carrot Cake" }))
})
  .then(()=>{
      console.log("carrot cake has been deleted");
      mongoose.connection.close();
      console.log(`connection closed`);
  })
  .catch((error)=>{
      console.log(error);
  })