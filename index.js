const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.
  connect('mongodb://localhost:27017/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


// Recipe.create(data)
//   .then(Recipe => console.log('The recipe is saved and its value is: ', Recipe))
//   .catch(err =>
//     console.log('An error happened while saving a new recipe:', err)
//   );

// Iteration 2 

Recipe.create({
  title: 'Pasta Tartufo',
  level: 'UltraPro Chef',
  cuisine: 'Italian',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
  duration: 40,
  creator: 'Chef Sha'
}).then(recipe => {
  console.log(recipe.title);
}).catch(err => {
  console.log(err);
});


Recipe.collection.drop();

// Iteration 3

Recipe.insertMany(data)
  .then(recipes => {
    console.log(recipes.map(recipe => recipe.title));
  })
  .catch(err => {
    console.log(err);
  });

// Iteration 4

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

// Iteration 5 & 6

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(result => {
    console.log("success", result)
    mongoose.connection.close() // Closing the database
  })
  .catch(err => {
    console.log(err);
  });
