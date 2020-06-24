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
    // Run your code here, after you have insured that the connection was made
    Recipe
      .create({
        title:"Tortilla de Patata",
        level:"Amateur Chef",
        ingredients: ['huevos', 'cebolla', 'aceite', 'perejil', 'sal', 'aceite de oliva' ],
        cuisine: "Spanish",
        dishType: "snack",
        image: "imagen",
        duration: 30,
        creator: "Diego",
      })
      .then(newRecipe => console.log('The new recipe is', newRecipe.title))
      .catch(err => console.log('Error finding recipe', err))

    Recipe
      .create(data)
      .then(newData => console.log('The recipes are:', newData))
      // .catch(err => console.log('Error finding recipes', err))

    Recipe
      .updateOne({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
      .then(newUpdate => console.log('The information changed is:', newUpdate.title))
      // .catch(err => console.log('Error finding recipes', err))

    Recipe
      .deleteOne({title: "Carrot Cake"})
      .then(newDelete => console.log('The recipe has been deleted:', newDelete))
    //   .catch(err => console.log('Error deleting Recipes', err))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
