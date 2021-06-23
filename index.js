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

  .then(() => {
    return Recipe.syncIndexes();
  })

  // 2 - create new recipe
  .then(() => {
    Recipe.create({
      title: 'sopa de ajo',
      level: 'Easy Peasy',
      ingredients: 'ajo pan more..',
      cuisine: 'X',
      dishType: 'soup',
      duration: 30,
      creator: 'Salva',
    })
      .then(newRecipe => console.log(newRecipe.title))
      .catch(error => console.log('problema creando receta', error));
  })

  // 3 - insert data
  .then(() => {
    Recipe.create(data)
      .then(recipeData => recipeData.forEach(recipe => console.log(recipe.title)))

      // 4 - Updating recipe, me costo darme cuenta de que se estaba completando este then antes que el insert, (cuando tenia este then fuera). y no me updateaba
      .then(() => {
        Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
          .then(info => console.log(info.n === 1 && info.nModified === 1 && info.ok === 1 ? 'Se ha modificado correctamente' : 'Error en el update'))
          .catch(err => console.log(err));
      })
      // 5 - removing recipe, and closing connection
      .then(() => {
        Recipe.deleteOne({ title: 'Carrot Cake' })
          .then(info => info.n && info.deletedCount && info.ok && mongoose.connection.close())
          .catch(err => console.log(err));
      })

      .catch(error => console.log(error));
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// When the connection is disconnected
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));
