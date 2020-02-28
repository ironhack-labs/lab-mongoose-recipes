/* eslint-disable no-console */
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

const pizza = {
  title: 'Homemade pizza prosciutto',
  level: 'Amateur Chef',
  ingredients: ['500gr of wheat flour', '5gr of yeast', '300ml of water', '100gr of ham', '300gr of mozzarella', '10gr of oregano'],
  cuisine: 'Italian',
  dishType: 'Dish',
  image: 'http://www.recetasdiarias.com/wp-content/uploads/2010/01/pizza-prosciutto.jpg',
  duration: 270,
  creator: 'Carles Galí with the collaboration of Daniel Jordà',
};

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })

  // Iteration 2
  .then(() => Recipe.create(pizza)
    .then(console.log(`${pizza.title} has been saved!`)))

  // Iteration 3
  .then(() => Recipe.insertMany(data))
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
  })

  // Iteration 4
  .then(() => {
    Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
    console.log('Recipes are updated');
  })

  // Iteration 5
  .then(() => {
    Recipe.deleteOne({ title: 'Carrot Cake' });
    console.log('A recipe has been deleted');
  })

  // Iteration 6
  .then(() => {
    mongoose.connection.close();
    console.log('The connection has been closed.');
  })

  .catch((err) => console.error('Error connecting to mongo', err));
