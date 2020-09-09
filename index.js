const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { update } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.set('useNewUrlParser', true);  // Fix all deprecation warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

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
    return Recipe.create([{
        title: "mi receta",
        level: "Easy Peasy",
        ingredientes: ['Soja', 'Apio'],
        cuisine: "Alemana",
        dishType: "breakfast",
        duration: 15,
        creator: "Pedro Conde",
        created: Date.now()
    }])
  })
  .then(newRecipe => console.log(newRecipe[0]))
  .then(() => Recipe.insertMany(data))
  .then(data => data.forEach(element => console.log(element.title)))
  .then(() => Recipe.findOneAndUpdate({
      title: "Rigatoni alla Genovese"
    }, {
        duration: 100
    }, {
        new: true
    }))
    .then(update => console.log("Actualizado!", update))
    .then(() => Recipe.deleteOne({
        title: "Carrot Cake"
    }))
    .then(el => console.log("Borrado correctamente", el))
    .then(() => mongoose.connection.close())
    .then(() => console.log("Cerramos la conexión"))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
