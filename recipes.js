const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const data = require('./data.js');

const Recipe = require('./models/recipe.js');

const recipeData = require('./data.js');

// useNewUrlParser to fix deprecation warning
mongoose.connect('mongodb://localhost/recipeApp', {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// fix deprecation issue
mongoose.set('useCreateIndex', true);

// 2. - create a recipe
Recipe.create({
  title: 'Rendang nr#4',
  level: 'UltraPro Chef',
  ingredients: ['beef', 'onions', 'garlic', 'coconot milk', 'ginger', 'lots of spices'],
  cuisine: ['Indonesian'],
  dishType: 'Dish',
  image: 'https://smaakmenutie.nl/wp-content/uploads/2017/10/Rendang-2-1170x780.jpg',
  duration: 540,
  creator: 'Unknown'
  // default created date
})
  .then(doc => { console.log(`title of new recipe: ${doc.title}`) })
  .catch(err => { console.log(err) });

// 3. - insert many recipes
Recipe.insertMany(recipeData)
  .then(doc => { console.log(doc.title) })
  .catch(err => { console.log(err) });

// 4. - update recipe
Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(doc => { console.log('Succesful update!') })
  .catch(err => { console.log(err) });

// 5. - remove carrot cake recipe
Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(doc => { console.log('Successfully removed') })
  .catch(err => { console.log(err) })

// 6. - close the database
process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose connection closed because stopped node'); 
    process.exit(0); 
  }); 
}); 