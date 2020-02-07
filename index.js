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


//Create one recipe
const newRecipe = {
  title: 'Pizza Margarita',
  level: 'Amateur Chef',
  ingredients: ['dough pizza', 'tomato sauce', 'mozzarella cheese'],
  cuisine: 'Italian',
  dishType: 'Dish',
  image: 'https://placeralplato.com/files/2015/06/pizza-Margarita.jpg',
  duration: 30,
  creator: 'Sara'
};

Recipe.create(newRecipe)
  .then(result => {
    console.log("Recipe created.");
  })
  .catch(err => {
    console.log(err);
  })

//Insert multiples recipes in the DB
Recipe.insertMany(data)
  .then(createdRecipesArr => {
    //Update a recipe
    const promise = Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100});
    return promise;
  })
  .then((updatedRecipe) => {
    //Delete a recipe
    const deletePromise = Recipe.deleteOne({title: "Carrot Cake"});
    return deletePromise;
  })
  .then(deletedRecipe => {
    //Close the connection to DB
    mongoose.connection.close(() => console.log("Connection closed."));
  })
  .catch(err => {
    console.log(err);
  });
