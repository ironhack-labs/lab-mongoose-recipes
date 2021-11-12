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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const recipe1 = {
      title: "Beans with palm oil",
      level: "Amateur Chef",
      ingredients: ["Palm oil", "Red Beans", "2 Bananas", "Grilled fish"],
      cuisine: "African",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Dona Teresa",
    };
    // console.log("recipe1.title :>> ", recipe1.title);
    return Recipe.create(recipe1);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((foundRecipe) => {
    console.log("Recipe updated successfully");
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true });
  })
  .then(() => {
    console.log("Recipe removed successfully");
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .finally(() => {
    console.log("Connection closed successfully");
    return mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
