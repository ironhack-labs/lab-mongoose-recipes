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
  .then(async () => {
    const newRecipe = {
      title: 'Pipoca',
      level: 'Amateur Chef',
      ingredients: ['Milho', 'Sal', 'Manteiga', 'Azeite'],
      cuisine: 'Mata Fome',
      dishType: 'snack',
      image: 'https://thumbs.dreamstime.com/b/popcorn-red-background-box-movie-flying-out-copy-space-78354377.jpg',
      duration: 15,
      creator: 'Chef Leo',
    };

    const myRecipe = await Recipe.create(newRecipe);
    console.log(`Recipe "${myRecipe.title}" created`);

    const recipesFromData = await Recipe.insertMany(data);
    recipesFromData.forEach((recipe) => {
      console.log(`Recipe "${recipe.title}" created`);
    });
  })
  .then(async () => {
    const updatedRecipe = await Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } }, { new: true });
    console.log(`Duration from recipe "${updatedRecipe.title}" updated to ${updatedRecipe.duration} minutes`);

    await Recipe.deleteOne({ title: 'Carrot Cake' });
    console.log('Recipe "Carrot Cake" removed successfully');
  })
  .then(() => {
    mongoose.connection.close();
    console.log('Database connection closed');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
