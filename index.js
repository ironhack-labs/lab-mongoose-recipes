const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

const fabada = {
  title: 'Fabada Asturiana',
  level: 'Amateur Chef',
  ingredients: ['500 gr de fabes de La Granja', '2 chorizos asturianos', '2 morcillas asturianas', '250 gr de panceta curada', '1 cebolla', 'Agua y sal'],
  cuisine: 'Española',
  dishType: 'main_course',
  image: 'https://cdn7.recetasdeescandalo.com/wp-content/uploads/2015/03/Fabada-asturiana-tradicional-y-aut%C3%A9ntica.jpg',
  duration: 120,
  creator: 'Ignacio Ironhack'
}

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create(fabada)
    .then(newRecipe => console.log('La nueva receta creada es:', newRecipe.title))
    .then(() => Recipe.create(data))
    .then(dataRecipes => dataRecipes.forEach(recipe => console.log('Las recetas añadidas de data son:', recipe.title)))
    .then(() => Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true}))
    .then(updated => console.log('La receta actualizada es:', updated.title))
    .then(() => Recipe.findOneAndRemove({title: 'Carrot Cake'}))
    .then(deleted => console.log('La receta eliminada es:', deleted.title))
    .then(() => mongoose.connection.close())
    .catch(error => console.error('Error detected', error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error)
  });