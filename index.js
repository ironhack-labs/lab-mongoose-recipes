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
  })

  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

///LAUNCHING THE PROMISE

  .then(() => {
        launchCRUDSequence()
    })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

"fofooooo".substring(1).toLowerCase().toUpperCase();

////FUNCTION DEFINITION

async function launchCRUDSequence() {
    
  const recipe = await Recipe.create({
      title: "Chocolate",
      level: "Easy Peasy",
      ingredients: "choco",
      dishType: "breakfast",
      duration: 30,
      creator: "Tony"
    });

    const allRecipes = await Recipe.insertMany(data);

    const updateRecipes = await Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {
        duration: 100,
      },
      { new: true }
    );

    const deletedRecipe = await Recipe.deleteOne({
      title: "Carrot Cake",

    });
    mongoose.connection.close();
  };