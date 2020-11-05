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
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    (async function () {
      // Iteration 2
      // const recipeCreated = await Recipe.create(data[0]);
      // console.log(recipeCreated.title);

      // Iteration 3
      const recipes = await Recipe.insertMany(data);
      console.log('Iteration 2 done.');
      recipes.forEach(recipe => console.log(recipe.title));

      // Iteration 4
      await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
      console.log('Iteration 4 done: recipe updated.');

      // Iteration 5
      await Recipe.findOneAndDelete({ title: 'Carrot Cake' }, console.log('Iteration 5 done: Carrot Cake is no longer available.'));

      // Iteration 6
      console.log('Closing the database...');
      mongoose.connection.close();
    })();

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  // .finally(() => {

  // });

