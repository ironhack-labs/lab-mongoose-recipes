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
  .catch((error)=>{
      console.lof(error);
  })

  async function updateDatabase () {
      try {
        await Recipe.insertMany(data);
        console.log("inserted recipes");
        await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" },
        { duration: 100 });
        console.log("Rigatoni have been updated");
        await Recipe.deleteOne({ title: "Carrot Cake" });
        console.log("carrot cake delete");
        mongoose.connection.close();
        console.log(`connection closed`);

      } catch(error) {
          console.log(error);
      }
     
  }

  updateDatabase();