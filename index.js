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

  /*
  Recipe.create(data[0])
  .then(recipe => console.log('The recipe is saved and its value is: ', recipe))
  .catch(error =>
    console.log('An error happened while saving a new user:', error)
  );
  
  Recipe.create(data)
  .then(recipe => {recipe.map(indice => (console.log('The recipe is saved and its title is: ', indice.title)))})
  .catch(error =>
    console.log('An error happened while saving a new user:', error)
  );
*/

Recipe.updateOne({ title:'Rigatoni alla Genovese' }, { duration: 100 }, {
  new: true})
  .then(console.log('Now the duration of the recipe is', recipe))
  .catch(error =>
    console.log('An error happened:', error)
  );


Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(console.log('Recipe deleted.', recipe))
  .catch(error =>
    console.log('An error happened:', error)
  );

Recipe.create(data)
  .then(recipe => console.log('The recipe is saved and its value is: ', recipe))
  .then (()=> mongoose.disconnect())
  .catch(error =>
    console.log('An error happened while saving a new user:', error)
  );



