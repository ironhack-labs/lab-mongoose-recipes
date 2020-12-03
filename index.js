const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Iteration 2.1

const newRecipe = {
  title: "Spaghetti bolognaise",
  level: "Amateur Chef",
  ingredients: [
    "500 g de spaghetti",
    "1 oignon",
    "2 gousses d'ail",
    "1 carotte",
    "1 branche de céleri",
    "850 g de tomate (fraîches ou en boîte selon la saison)",
    "37,5 ml de vin rouge",
    "500 g de boeuf haché",
    "50 cl de bouillon",
    "persil",
    "1 cuillère à café de sucre",
    "2 cuillères à soupe d'huile",
  ],
  cuisine: "Italian",
  dishType: "main_course",
  image:
    "https://assets.afcdn.com/recipe/20171115/75051_w1024h768c1cx1750cy2625.jpg",
  duration: 80,
  creator: "Chef René",
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
  .then(async () => {
    // Iteration 2.2
    const recipe = await Recipe.create(newRecipe);
    console.log("The title of the recipe is ---> " + recipe.title);

    // Iteration 3
    const importData = await Recipe.insertMany(data);
    importData.forEach((element) => {
      console.log(element.title);
    });

    // Iteration 4
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      {
        duration: 100,
      }
    );

    //Iteration 5
    await Recipe.deleteOne({ title: "Carrot Cake" });

    // Iteration 6
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
