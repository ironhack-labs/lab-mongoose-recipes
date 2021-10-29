const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then( async () => {
    // Iteration 1
    const newRecipe = {
      title: 'Pasta with sauce and meat',
      level: 'Easy Peasy',
      ingredients: ['Pasta', 'Tomatoes', 'Meat'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 20,
      creator: 'Carlos Daniel'
    };

    try{

      // Iteration 2
      const createdRecipe = await Recipe.create(newRecipe);
      console.log(`Inserted one new recipe => ${createdRecipe.title}`);

      // Iteration 3
      const manyNewRecipes = await Recipe.insertMany(data);
      console.log('Finished inserting recipes');
      manyNewRecipes.forEach(recipe => console.log(recipe.title));

      // Iteration 4
      const updatedRecipe = await Recipe.findOneAndUpdate(
        { title: 'Rigatoni alla Genovese' },
        { $set: { duration: 100 } },
        { new: true, useFindAndModify: false },
      );
      console.log(`Successfully updated recipe ${updatedRecipe.title}`);

      // Iteration 5
      await Recipe.deleteOne( {title: 'Carrot Cake' });
      console.log('Recipe Deleted');

      // Iteration 6
      mongoose.connection.close();

    } catch (error) {
      console.error(error);
    }
  })