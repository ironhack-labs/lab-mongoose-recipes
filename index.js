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
  .then(() => {
    return Recipe.create({
      title: "European Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "2 cup rice vinegar",
        "20 tablespoons honey",
        "3 cup soy sauce (such as Silver Swan®)",
        "4 cup Asian (toasted) sesame oil",
        "4 tablespoons Asian chili garlic sauce",
        "5 tablespoons minced garlic",
        "salt to taste",
      ],
      cuisine: "European",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: ":(",
    });

    // Run your code here, after you have insured that the connection was made
  })
  .then((newRecipe) => console.log(newRecipe))
  .then(() => Recipe.insertMany(data))
  .then((recipesCreated) =>
    recipesCreated.forEach((recipe) => console.log(recipe.title))
  )
  .then(() =>
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    )
  )
  .then((recipe) => console.log(`success!! ${recipe.duration}`))
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(() => mongoose.connection.end())
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
