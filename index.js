const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

const newRecipe = {
  title: 'Vegan Cake Gluten Free',
  level: 'Amateur Chef',
  ingredients: ['1 molecule of Oxigen', '2 molecule of Hidrogen', 'Big Cake Mold'],
  cuisine: 'Hipster',
  dishType: 'Dessert',
  image: 'https://images-na.ssl-images-amazon.com/images/I/61imCCyOjCL._SX466_.jpg',
  duration: 40,
  creator: 'Chef ImacZombie'
};

//Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    //tuve que añadir este método para borrar los datos existentes y poder escribir unos nuevos sin mostrar el error de title repetido
    return Recipe.deleteMany({});
  })
  .then(() => {
    return Recipe.create(newRecipe);
  })
  .then(docs => {
    console.log(`New Recipe Created: ${newRecipe.title} `);
    return Recipe.insertMany(data);
  })
  .then(() => {
    console.log('Many Recipies Inserted');
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    console.log('Recipe Updated');
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Recipe Deleted');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error: ', err);
  });
