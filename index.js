const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { db } = require('./models/Recipe.model');

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
  .then(() => {
    return Recipe.create({
      title: 'ajonesa',
      level: 'Easy Peasy',
      ingredients: ['eggs', 'oil', 'garlic', 'lemon juice'],
      cuisine: 'Spanish',
      dishType: 'Sauce',
      image: '',
      duration: 5,
      creator: 'Roma'
    })
  .then(recipe => {
    console.log('La nueva receta se llama', recipe.title)
      })
  .then(() => {
    return Recipe.insertMany(data)
      .then(() => {
        data.forEach((res) => {
          console.log('El titulo de la receta es:', res.title)
        })
      })
    })
  .then(() => {
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      })
      .then(() => {
        return Recipe.deleteOne({ title: 'Carrot Cake' })
      })
  })

  .then(() => { mongoose.connection.close()
  .then(() => console.log(`¡TRESCIENTOS INTENTOS DESPUES HE CONSEGUIDO CERRARLO!`))
  .catch(() => console.error('delete Failed'));
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

