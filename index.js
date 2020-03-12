const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

const closeConnection = async () => {
// Iteration 2: Create a recipe
const createRecipe = await Recipe.create({
    title: 'Lemon Mousse',
    level: 'Easy Peasy',
    ingredients: ['2 lemons', '1 cup condensed milk', '1 cup cream to assemble'],
    cuisine: 'Andorran',
    dishType: 'Dessert',
    image: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/08/moussedelimonylechecondensada.jpg',
    duration: 15,
    creator: 'PaulaMZ'
  })
  .then(recipe => console.log('The recipe is saved! Title: ' + recipe.title))
  .catch(error => console.log('An error happened saving a new value: ', error));

// Iteration 3: Insert multiple recipes
const insertRecipe = await Recipe.insertMany(data)
  .then(recipe => {
    recipe.map(recipe => console.log('Many recipes have been saved! Title: ' + recipe.title))
  })
  .catch(error => console.log('An error happened saving many recipes: ', error));


// Iteration 4: Update recipe
const updateRecipe = await Recipe.updateOne({
    title: 'Rigatoni alla Genovese'
  }, {
    duration: 100
  })
  .then(console.log('Update Succes!!'))
  .catch(error => console.log('An error happened updating: ', error));

// Iteration 5: Remove a recipe
const deleteRecipe = await Recipe.deleteOne({
    title: 'Carrot Cake'
  })
  .then(console.log('Remove Succes!!'))
  .catch(error => console.log('An error happened removing: ', error));

  await mongoose.disconnect();
};

//Iteration 6: Close the Database
closeConnection();

