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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {
    Recipe.create(
      { title: 'Spanish omelette', level: 'Easy Peasy', ingredients: ['eggs', 'potatoes', 'onion', 'salt', 'olive oil'], cuisine: 'Spanish', dishType: 'main_course', image: "https://cdn1.cocina-familiar.com/recetas/thumb/tortilla-de-patata-con-cebolla.jpg", duration: 30, creator: 'Señor Tortilla', created: Date('2020-18-10') }
    )
      .then(theNewRecipe => console.log('La nueva receta es:', theNewRecipe.title))
      .catch(err => console.log('Error creando el registro:', err))

    
  })
  .then(() => {
    Recipe.insertMany(data)
      .then(Recipes => Recipes.forEach(e => console.log('Las nuevas recetas son:', e.title)))
      .catch(err => console.log('Error nuevas recetas:', err))
  })


  Recipe
    .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
    .then(data => console.log("Bien!! El nuevo dato es:", data))
    .catch(err => console.log('Error cambiando dato', err))

    
  Recipe
    .deleteOne({ title: 'Carrot Cake' })
    .then(recipe => console.log('Ya no existe la receta', recipe))
    .catch(err => console.log('Error al borrar receta', err))
  
    
  mongoose.connection.close(console.log('Bye, Bye!!'))
    

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
