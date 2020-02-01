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

// const recette = { title: 'Bolognaise', level: 'Easy Peasy', ingredients: ['pasta','tomato sauce'], cuisine : 'italian'};

// Recipe.create(recette)
//   .then(recipe => console.log('The recipe is saved and its value is: ', recipe))
//   .catch(error =>
//     console.log('An error happened while saving a new recipe:', error)
//   );

  // Recipe.insertMany(data, function(error, docs) {});

  // Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  // .then()
  // .catch();
  
  Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(console.log("success, you deleted Carrot Cake !"))
  .catch();

// mongoose.connection.close()

  