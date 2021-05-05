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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  

  .then(async () => {
    // ================ ITERATION 1 ==============================
    const newRecipe = await Recipe.create({
      title: "Crepes",
      level: "Amateur Chef",
      ingredients: ["milk", "flour", "eggs", "rhum", "sugar", "butter"],
      cuisine: "french",
      dishType: "dessert",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 15,
      creator: "Les Bretons",
    });

    //================ ITERATION 2 =======================
    const newRecipes = await Recipe.insertMany(data);

    //================ ITERATION 3 =======================

    const updatedRecipes = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );

    //================ ITERATION 4 =======================

    const deletedCarrotCake = await Recipe.deleteOne({ title: "Carrot Cake" });

    const disconnect = await mongoose.connection.close(() => {
      console.log("connection is closed !")
    })
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
  



  
