const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const fillRecipe = async () => {
  try {
    await mongoose
      .connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })

      .then((self) => {
        console.log(`Connected to the database: "${self.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany();
      });

    console.log("connected");

    /*    const newRecipe = { this is just one recipe (iteration 1)
      title: "noodles",
      cuisine: "chinese",
    };
    const createdRecipe = await Recipe.create(newRecipe);
    console.log(createdRecipe.title); */

    await Recipe.insertMany(data);
    console.log(data);

    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );

    await Recipe.deleteOne({ title: "Carrot Cake" });
  } catch (error) {
    console.log(error);
  }
  //disconnect
  mongoose.disconnect();
};

fillRecipe();
