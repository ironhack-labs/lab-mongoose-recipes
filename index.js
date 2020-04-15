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
      {
        title: 'Pizza',
        level: 'Amateur Chef',
        ingredients: ['piña', 'masa para pizza', 'salsa de tomate', 'queso mozzarella', 'jamón york'],
        cuisine: 'italian',
        dishType: 'main_course',
        image: 'https://www.recetin.com/wp-content/uploads/2015/05/pizza_hawaiana.jpg',
        duration: 30,
        creator: 'Madalin y Paty',
        created: new Date(),
      }
    )
      .then(newRecipeCreated => console.log('La nueva receta creada es:', newRecipeCreated, 'y su título es:', newRecipeCreated.title))
      
      Recipe.create(data)
      .then(newRecipeCreated => console.log('La nueva receta creada es:', newRecipeCreated, data.js), newRecipeCreated.forEach(recipe => console.log('Los títulos de las recetas son:', newRecipeCreated.title)) )
      
      .catch(err => console.log('Error creando la receta', err))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  