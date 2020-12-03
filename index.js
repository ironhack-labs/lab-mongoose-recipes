const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const newRecipe = {
  title: "Pâtes au saumon",
  level: "UltraPro Chef",
  ingredients: [
    "200g de pâtes",
    "3 tranches de saumon",
    "1 échalote",
    "1 pot de crème fraîche",
    "1 pincée de sel",
    "1 pincée de poivre",
  ],
  cuisine: "Français",
  dishType: "main_course",
  image:
    "https://static.750g.com/images/600-600/26fa667a22b0845fe0d5e592c64e3cb3/pates-au-saumon-fume.png",
  duration: 20,
  creator: "Chef Marine Sanjuan",
};

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
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    //ITERATION 2
    const newData = await Recipe.create(newRecipe);
    console.log("here is the new recipe", newData.title);

    //ITERATION 3
    const insertData = await Recipe.insertMany(data);

    insertData.forEach((oneRecipe) => {
      console.log(oneRecipe.title);
    });

    //ITERATION 4
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );

    await Recipe.deleteOne({ title: "Carrot Cake" });

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
