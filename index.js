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
    useFindAndModify:false
  })
  
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async() => {
    
    // Run your code here, after you have insured that the connection was made

      const newRecipe = {
        title: 'tagine',
        level: 'UltraPro Chef',
        ingredients: ['onion', 'chiken', 'olive', 'potato'],
        cuisine: 'morroco',
        duration: 15,
        creator: 'Amine',
      };
  
      const myRecipe = await Recipe.create(newRecipe);
      console.log(`Recipe "${myRecipe.title}" created`);
  
      const  insertMultipleRecipes = await Recipe.insertMany(data);
      insertMultipleRecipes.forEach((recipe) => {
        console.log(`Recipe "${recipe.title}" created`);
      });
      const updatedRecipe = await Recipe.findOneAndUpdate({ $set: { duration: 100 } }, { new: true });
      console.log(`Duration from recipe updated to ${updatedRecipe.duration} minutes`);
  
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

