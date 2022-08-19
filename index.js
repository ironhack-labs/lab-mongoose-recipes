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
  .then(async () => {
    const newRecipe = await Recipe.create({
      title: "Dan Dan Noodles",
      level: "Amateur Chef",
      ingredients: [
        "1/2 lb ground pork, beef, chicken or crumbled tofu",
        "1 tbsp chopped garlic (approximately 3 cloves garlic)",
        "1 tsp chopped ginger",
        "1 tbsp soy sauce",
        "1tbsp shaoxing wine, dry sherry or rice wine",
        "pinch of black pepper",
        "1 tbsp cooking oil",
        "2 oz Chinese preserved mustard green, chopped (You can omit this or substitute with any pickled mustard green or kimchi – after washing)",
        "1 tsp chopped garlic (approximately 2 cloves garlic)",
        "2 tbsp tahini (preferred made with toasted sesame seeds) or peanut butter",
        "1 1/2 tbsp soy sauce",
        "1 tsp dark soy sauce",
        "3 tbsp chili oil with chili flakes",
        "1 to 3 tsp toasted and grinned Sichuan peppercorns",
        "1/2 tbsp sugar",
        "2 portions fresh egg noodles or spaghetti",
        "handful of yu choy, bok choy, napa cabbage or any green leafy vegetables",
        "3 Tbsp sauce (approximately half of the sauce)",
        "1/4 cup hot chicken or veggie broth",
        "green onion chopped",
        "crushed peanuts or sesame seeds for garnish",
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://i0.wp.com/photos.smugmug.com/Dan-Dan-Noodles/i-Lffjc73/0/71061bfb/X2/Dan%20Dan%20Noodles%208%20copy-X2.jpg?w=1170&ssl=1",
      duration: 20,
      creator: "Chef Guillaume",
    });

    console.log(newRecipe.title);
    const createdRecipes = await Recipe.create(data);
    const titles = createdRecipes.map((recipe) => recipe.title);
    console.log(titles);

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: `Rigatoni alla Genovese` },
      { duration: 100 },
      { new: true }
    )


  })

  // .then((x) => {
  //   // Recipe.insertMany(data)
  //   //   .then((createdRecipes) => {
  //   //     const titles = createdRecipes.map((recipe) => recipe.title);
  //   //     console.log(titles);
  //   //   })
  //   //   .then(() => {
  //   //     return Recipe.findOneAndUpdate(
  //   //       { title: `Rigatoni alla Genovese` },
  //   //       { duration: 100 },
  //   //       { new: true }
  //   //     );
  //   //   })
  //   //   .then(({ title, duration }) => {
  //   //     console.log(`${title}'s duration was updated to ${duration}.`);
  //   //   })
  //   //   .then(() => {
  //   //     return Recipe.deleteOne({ title: `Carrot Cake` });
  //   //   })
  //   //   .then((deleteMsg) => {
  //   //     console.log(deleteMsg);
  //   //   })
  //   //   .then(() => {
  //   //     mongoose.disconnect();
  //     })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
