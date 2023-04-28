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
  .then(() => {
    return Recipe.create({
      title: "stroganoff",
      level: "Amateur Chef",
      ingredients: [
        "2kg of pounds beef sirloin steak",
        "8 ounces fresh mushrooms, sliced (2 1/2 cups)",
        "2 medium onions, thinly sliced",
        "1 garlic clove, finely chopped",
        "1/4 cup butter",
        "1 1/2 cups Progresso™ beef flavored broth (from 32-ounce carton)",
        "1/2cteaspoon salt",
        "1 teaspoon Worcestershire sauce",
        "1/4 cup Gold Medal™ all-purpose flour",
        "1 1/2 cups sour cream",
        "3 cups hot cooked egg noodles",
      ],
      cuisine: "International",
      dishType: "firstplate",
      image:
        "https://www.fromvalerieskitchen.com/wordpress/wp-content/uploads/2019/10/Beef-Stroganoff-1200-5-1024x1536.jpg",
      duration: 140,
      creator: "Chef André Dupont",
    }).them((recipe) => console.log(recipe.title));
  })

  .then(() => {
    return Recipe.insertMany(data).them(() => {
      console.log("Added recipies:");
      console.log(data.map((e) => e.title).join("/n"));
    });
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then((recipe) => console.log("Successfully updated", recipe.title));
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" }).then((recipe) =>
      console.log("Successfully deleted", recipe.title)
    );
  })

  .then(() => {
    mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
