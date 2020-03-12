const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error('Error connecting to mongo', err));

Recipe.insertMany(data);

Recipe.create({
  title: 'Pasta Puttanesca',
  level: 'Easy Peasy',
  ingredients: ['Pasta', 'Black olives', 'Capers', 'Tomatoes', 'Anchovies'],
  cuisine: 'Italian',
  dishType: 'Dish',
  image: '',
  duration: 45,
  creator: 'Frankie',
  created: new Date(),
})
  .then(itemInfo => {
    console.log('New recipe created successfully!');
  })
  .catch(error => {
    console.log(
      'It looks like there was a problem creating the recipe!',
      error
    );
  });

Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(updateMsg => {
    console.log('Recipe was successfully update!');
  })
  .catch(error => {
    console.log('Something went wrong, recipe was not updated!', error);
  });

Recipe.findOneAndDelete({ name: 'Carrot Cake' })
  .then(deleteInfo => {
    console.log('Recipe was successfully deleted!');
  })
  .catch(error => {
    console.log('Item could not be deleted!', error);
  });

mongoose.connection.close;
