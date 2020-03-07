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


const recipe = {
  title: 'Lasagna',
  level: 'UltraPro Chef',
  ingredients: ['Meatloaf', 'Tomatoes'],
  cuisine: 'Italian',
  dishType: 'Dish',
  duration: 80,
  creator: 'Friso'
}

Recipe.create(recipe)
  .then(value => console.log(`The added recipe is: ${value}`))

Recipe.insertMany(data)
  .then(values => console.log(`The added recipes are: ${values}`))
  .then(() => Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}))
  .then(() => console.log(`The recipe is updated`))
  .then(() => Recipe.deleteOne({title: 'Carrot Cake'}))
  .then(() => console.log(`The recipe is deleted`))
  .then(() => {
    console.log('All database tasks are done');
    mongoose.connection.close();
  }).catch(err => console.error(err));