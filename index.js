require("dotenv").config();

const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = process.env.MONGODB_URI;

const createRecipe = async recipe => {
  try {
    await Recipe.create(recipe);
    console.log(`A new recipe was created: ${recipe.title}`);
  } catch (error) {console.log(console.log(`Error while creating ${recipe.title}: ${error}`))};
};

const insertMultipleRecipes = async recipes => {
  try {
    await Recipe.insertMany(recipes);
    recipes.forEach(recipe => console.log(`A new recipe was created: ${recipe.title}`));
  } catch (error) {recipes.forEach(recipe => console.log(`Error while creating ${recipe.title}: ${error}`))};
};

const updateRecipeUsingTitle = async (recipeTitleToUpdate, updatedField) => {
  try {
    await Recipe.findOneAndUpdate({ title: recipeTitleToUpdate }, updatedField);
    console.log(`${recipeTitleToUpdate} was updated!`);
  } catch (error) {console.log(`Error while updating ${recipeTitleToUpdate}: ${error}`)};
};

const removeRecipeUsingTitle = async recipeTitleToRemove => {
  try {
    await Recipe.deleteOne({ title: recipeTitleToRemove });
    console.log(`${recipeTitleToRemove} was removed from the database`);
  } catch (error) {console.log(`Error while removing ${recipeTitleToRemove} from database: ${error}`)};
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    (async () => {
      await createRecipe({
        title: "Broccoli & Stilton soup",
        level: "Amateur Chef",
        ingredients: [
          "2 tblsp Rapeseed Oil",
          "1 finely chopped onion",
          "1 celery", "1 sliced leek",
          "1 medium potatoes",
          "1 knob butter",
          "1 litre hot vegetable stock",
          "1 head chopped broccoli",
          "140g stilton cheese"
        ],
        cuisine: "British",
        dishType: "soup",
        image: "https://www.themealdb.com/images/media/meals/tvvxpv1511191952.jpg",
        duration: 45,
        creator: "unknown"
      });
      await insertMultipleRecipes(data);
      await updateRecipeUsingTitle("Rigatoni alla Genovese", { duration: 100 });
      await removeRecipeUsingTitle("Carrot Cake");
      await mongoose.connection.close()
    })();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });