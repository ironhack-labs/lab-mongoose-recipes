const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'
const recipe1 = {
  title: 'Arroz tres delicias',
  level: 'Amateur Chef',
  ingredients: ['a lot of rice', '1 omellette', 'a lot of beans', 'ham'],
  cuisine: 'Mine',
  dishType: 'Dish',
  duration: 30,
  creator: 'Victor Ronda'
};

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

 /*  Recipe.create(recipe1)
      .then(recipe => console.log (recipe.title))
      .catch(err => console.error('Error connecting to mongo', err)); */

/* Recipe.insertMany(data)
      .then(recipe => recipe.map(data => console.log(`The recipe is saved and its name is: ${data.title}`)))
      .catch(err => {console.error('Error connecting to mongo', err)});  */

/* Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
      .then(console.log('Something have been updated! '))
      .catch(err => {console.error('Error connecting to mongo', err)});  */

 Recipe.deleteOne({title: 'Carrot Cake'})
      .then(console.log('You have deleted something! '))
      .catch(err => {console.error('Error connecting to mongo', err)});


mongoose.disconnect()
        .then(console.log('Mongoose disconected'))
        .catch(err => console.error(err) );

  
    