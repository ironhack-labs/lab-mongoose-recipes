const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

module.exports = mongoose

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
    return Recipe.syncIndexes()
  })

  .then(() => {
    return Recipe
      .create({ title: 'Sandwich', level: 'Easy Peasy', ingredients: ['bread', 'ham', 'cheese'], cuisine: 'American', dishType: 'snack', image: ' ', duration: 10, creator: 'Paula de Andrés'})
      .then(newRecipe => console.log('Se ha creado esta receta:', newRecipe))
      .catch(err => console.log('Se ha producido un error:', err))
  })

  .then(() => {
    return Recipe
      .insertMany(data)
      .then(allRecipes  => console.log('Estas son las recetas:', allRecipes))
      .catch(err => console.log('Se ha producido un error:', err))
  })

  .then(() => {
return Recipe
  .findOneAndUpdate({title: "Rigatoni alla Genovese" }, {duration: 100}, {new: true})
  .then(recipe=> console.log('succesfully updated Rigatoni duration time:', recipe))
  .catch(err => console.log('Se ha producido un error:', err))
  })

  .then(() => {
    return Recipe
      .deleteOne({ title: "Carrot Cake" })
      .then(recipe=> console.log('succesfully Removed Carrot Cake:', recipe))
      .catch(err => console.log('Se ha producido un error:', err))
  })

  .then(() => {
    mongoose.connection.close()
    console.log('The server is closed')
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });





