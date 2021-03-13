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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {
    const newRecipe = {
      title: 'Pasta with sauce and meat',
      level: 'Easy Peasy',
      ingredients: [ 'Pasta', 'Tomatoes', 'Meat' ],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 20,
      creator: 'Anderson',
    };

    try {
      const createdRecipes = await Recipe.create(newRecipe);
      console.log(`Inserted one new Recipe => ${createdRecipes.title}`);
    
      const manyNewRecipes = await Recipe.insertMany(data);
      console.log('Finished inserting many Recipes');
      manyNewRecipes.forEach(recipe => console.log(recipe.title));

      const updateRecipes = await Recipe.findOneAndUpdate(
        { title: 'Rigatoni alla Genovese' },
        { $set: { duration: 100 } },
        { new: true, findOneAndUpdate: false },
      );

      console.log(`Successfully update recipe "${updateRecipes.title}" duration to ${updateRecipes.duration} minutes`);

        await Recipe.deleteOne({ title: 'Carrot Cake' } );
        console.log('Recipe is deleted');

        mongoose.connection.close();
    
    } catch (error) {
      console.log(error);
    }
    

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
