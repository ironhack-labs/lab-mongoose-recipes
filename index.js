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
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany() 
  })
  .then(() => {
    return Recipe.syncIndexes();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
      .create({title: 'Ensaladilla rusa', level: 'Easy Peasy', ingredients: ['Patatas', 'Huevos', 'Mayonesa', 'Maiz', 'Atún'], cuisine: 'Mediterránea', dishType: 'main_course', duration: 30})

      .then(() => Recipe.create(data))
      .then(recipes => recipes.forEach((recipe) => console.log('Se ha creado la siguiente receta: ', recipe.title)))

      .then(() => Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}))
      .then(recipe => console.log('Exito al modificar la receta de:', recipe.title))

      .then(() => Recipe.deleteOne({title: 'Carrot Cake'}))
      .then(() => console.log('La receta ha sido correctamente eliminada de la base de datos'))
      .then(() => mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
      }))
      .catch(err => console.error('Error realizando las operaciones sobre la BBDD =>', err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
