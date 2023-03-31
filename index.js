const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



// iteration 2

let newRecipe = {
  title: 'Spaghetti Bolognese',
  level: 'Amateur Chef',
  ingredients: ['speghetti', 'meat', 'tomatoes'],
  cuisine: 'Italian',
  dishType: 'main_course',
  image:
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/the-best-spaghetti-bolognese-7e83155.jpg?quality=90&webp=true&resize=300,272',
  duration: 15,
  creator: 'RS'
};

Recipe
  .create(newRecipe)
  .then(result => console.log(`recipe added: ${result.title}`))
  .catch(err => console.log(err));

// iteration 3

Recipe

  .insertMany(data)
  .then(result => {
    result.forEach(item => {
      console.log(`recipe for ${item.title} inserted successfully`);
    });
  })
  .catch(err => console.log(err));

// iteration 4

Recipe

  .updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => console.log(`The recipe is updated`))
  .catch(err => console.log(err));

// iteration 5

Recipe

  .deleteOne({ title: 'Carrot Cake' })
  .then(() => console.log(`The recipe is deleted`))
  .catch(err => console.log(err));

// iteration 6

mongoose.connection
  
  .close()
  .then(() => console.log(`connection closed`))
  .catch(err =>
    console.log(
      `an error while closing database connection has occurred: ${err}`
    )
  );
  