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


// Recipe.create(data)
//   .then(recipe => console.log('The recipe is saved', recipe))
//   .catch(error =>
//     console.log('An error happened while saving a recipe:', error)
//   );

// Recipe.insertMany(data)
// .then(recipe =>{recipe.map(index => console.log('The recipe is saved and its name is ', index.title))})
// .catch(error =>
//   console.log('An error happened while saving a recipe:', error)
// );

// Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
// .then(x => console.log("Success! Recipe updated!"))
// .catch(err => console.error('Error, recipe not updated', err));

Recipe.deleteOne({title: 'Carrot Cake'})
  .then(x => console.log("Success! Recipe deleted!"))
  .then(() => mongoose.disconnect())
  .catch(err => console.error('Error, recipe not deleted', err));