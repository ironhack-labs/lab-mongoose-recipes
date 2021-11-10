const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

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

  .then(() => Recipe.syncIndexes())

  .then(() => {

    Recipe
      .create([
        {
          title: 'Spanish Omelette',
          level: 'Easy Peasy',
          ingredients: ['Potatoes', 'eggs', 'olive oil'],
          cuisine: 'Spanish',
          dishtype: 'breakfast',
          image: "https://images.media-allrecipes.com/images/75131.jpg",
          duration: 60,
          creator: 'Begonia',
          created: 20,
        }
      ])

  })
  .then(theNewRecipe => console.log('Se ha creado estos registros:', theNewRecipe))
  .then(() => Recipe.create(data))
  .then(theNewRecipes => console.log('Se ha creado estos registros:', theNewRecipes))
  .then(() => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true }))
  .then(duck => console.log("El perro modificado es:", duck))
  .then(() => Recipe.findOneAndDelete({ title: 'Carrot Cake' }))
  .then(duck => console.log("El perro modificado es:", duck))




  .catch(error => {
    console.error('Error connecting to the database', error);
  });
mongoose.connection.close()

