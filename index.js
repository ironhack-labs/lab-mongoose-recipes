const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Iterations 2 & 3 can happen in parallel
async function insertRoutines() {
  const newRecipe = {
    title: 'Henriques Pasta with sauce and meat',
    level: 'Easy Peasy',
    ingredients: ['Pasta', 'Tomatoes', 'Meat'],
    cuisine: 'Italian',
    dishType: 'main_course',
    duration: 20,
    creator: 'Henrique Mendes',
  };

  try {
  const createRecipePromise = Recipe.create(newRecipe);
  const manyNewRecipesPromise = Recipe.insertMany(data);
  
  const results = await Promise.all([createRecipePromise, manyNewRecipesPromise]);

  console.log(`Inserted one new Recipe => ${results[0].title}`);
  console.log('Finished inserting many Recipes');
  results[1].forEach(recipe => console.log(recipe.title));
  } catch (error) {
    throw new Error(error.message);
  }
}

// Iterations 4 & 5 can happen in parallel
async function updateAndDeleteRoutines() {
  try {
    // Iteration 4
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { $set: { duration: 100 } },
      { new: true, useFindAndModify: false },
    );
    console.log(`Successfully updated recipe "${updatedRecipe.title}" duration to ${updatedRecipe.duration} minutes`);
  
    // Iteration 5
    await Recipe.deleteOne({ title: 'Carrot Cake' });
    console.log('Recipe Carrot Cake deleted');
  } catch (error) {
    throw new Error(error.message);
  }
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {
    try {
      // Iterations 2 & 3
      await insertRoutines();
      // Iterations 4 & 5
      await updateAndDeleteRoutines();
      // Iteration 6
      mongoose.connection.close();
    } catch (error) {
      console.log(error)
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });