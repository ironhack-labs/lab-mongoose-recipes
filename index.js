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
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones

    return Recipe.deleteMany();
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    Recipe.create({
      title: 'Risotto de Boletus',
      level: 'Amateur Chef',
      ingredients: [
        'Boletus',
        'Arroz',
        'Mantequilla',
        'Grana Padano',
        'Perejil',
        'Vino Blanco',
        'Cebolla',
        'Pimienta negra',
      ],
      cuisine: 'Italiana',
      dishType: 'main_course',
      image:
        'https://www.kenwoodworld.com/Global/Countries/Spain/Pasta/RISOTTO-BOLETUS.jpg',
      duration: 45,
      creator: 'Sybil Vane',
    }).then(newRecipe => console.log(newRecipe.title));
  })
  .then(() => {
    return Recipe.create(data);
  })
  .then(importedResults =>
    importedResults.forEach(recipe => {
      console.log(recipe.title);
    })
  )
  .then(() =>
    Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    )
  )
  .then(updatedRecipe => console.log('Recipe updated!', updatedRecipe.title))
  .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
  .then(deletedRecipe => console.log('Recipe deleted!'))
  .then(() => mongoose.connection.close())
  .catch(error => {
    console.error('Recipe Error!', error);
  });
