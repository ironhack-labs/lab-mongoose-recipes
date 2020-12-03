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
  .then(async () => {
    const newRecipe = {
      title: "Lasagnes",
      level: "UltraPro Chef",
      ingredients: [
        "1 paquet de pâtes de lasagnes",
        "Oignon jaunes",
        "Gousses d'ail",
        "Boeuf haché",
        "1 pincée de sel",
        "1 pincée de poivre",
      ],
      cuisine: "Italien",
      dishType: "main_course",
      image:
        "https://hips.hearstapps.com/vidthumb/images/180820-bookazine-delish-01280-1536610916.jpg?crop=1.00xw%3A0.846xh%3B0.00160xw%2C0.154xh&resize=480%3A270",
      duration: 40,
      creator: "Chef Duarte Paradela",
    };

    //Iteration 2
    await Recipe.create(newRecipe);

    // Iteration 3
    await Recipe.insertMany(data);

    data.forEach((recipe) => console.log(recipe.title));

    //Iteration 4
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    console.log("Successful update");

    //Iteration 5
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Successful deletion");

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
