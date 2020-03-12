const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'
const data1 =       {
  title: 'Pa amb Tomàquet',
  level: 'Easy Peasy',
  ingredients: ['Bread', "1 tomato", 'garlic', 'salt to taste', 'olive oil'],
  cuisine: 'Catalan',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 2,
  creator: 'Pau Larrea'
}
// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


  Recipe.create(data1)
  .then(recipe => console.log(recipe))
  .catch(error => console.error(error));

  Recipe.insertMany(data)
  .then(recipe => recipe.map( data => console.log(data.title)))
  .catch(error => console.error(error));

  Recipe.update({title: 'Rigatoni alla Genovese'},{ duration: 100}, {new: true})
  .then(recipe => console.log(recipe))
  .catch(error => console.error(error));

  Recipe.deleteOne({title: 'Carrot Cake'})
  .then(recipe => console.log(recipe))
  .catch(error => console.error(error));

mongoose.disconnect()
.catch(error => console.error(error));