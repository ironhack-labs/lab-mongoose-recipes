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
  .then(x => 
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    return Recipe.deleteMany()
  .catch(err => console.error('Error connecting to mongo', err))
  .then(() => {
    return Recipe.create({
      title: 'Macarrones con chorizo',
        level: 'Easy Peasy',
        ingredients: ['Macarrones, chorizo, tomate y sal'],
        cuisine: 'Española',
        dishType: 'Dish',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
        duration: 20,
        creator: 'Arthur&Franky'
      })
    .then(recipe => console.log(recipe.title))
    .catch(error =>
      console.log('An error happened while saving a new recipe:', error)
    );
  })
  .then(() => {
    return Recipe.insertMany(data)
    .then(recipes => recipes.forEach(recipe => console.log(recipe.title)))
    .catch(error =>
    console.log('An error happened while saving the recipes:', error)
    );
  })
  .then(() => {
    return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
    .then(console.log('Recipe updated successfully'))
    .catch(error =>
      console.log('Error updating recipe: ', error)
    );
  })
  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
    .then(console.log('Recipe deleted successfully'))
    .catch(error =>
      console.log('Error deleting recipe: ', error)
    );
  })
  .then(() => {
    mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
    });
  });

  


  