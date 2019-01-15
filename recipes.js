const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/recipes.model');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({
  title: 'Good Old Fashioned Pancakes',
  level: 'UltraPro Chef',
  ingredients: ['1 1/2 cups all-purpose flour', '3 1/2 teaspoons baking powder', '1 teaspoon salt', '1 tablespoon white sugar', '1 1/4 cups milk', '1 egg', '3 tablespoons butter, melted'],
  cuisine: 'American',
  dishType: 'Breakfast',
  image: 'https://images.media-allrecipes.com/userphotos/560x315/4948036.jpg',
  duration: 20,
  creator: 'Javi',
})
  .then(recipe => { console.log(`This recipe has been saved as: ${recipe.title}`)})
  .catch(err => { console.error(`Error ocurred: ${err}`)});

Recipe.insertMany(data)
  .then(recipe => { console.log(`This recipe has been saved as: ${recipe.title}`)})
  .catch(err => { console.error(`Error ocurred: ${err}`)});

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(recipe => { console.log(`This recipe has been updated with a duration of: ${recipe.duration}`)})
  .catch(err => { console.error(`Error ocurred while updating: ${err}`)});

Recipe.deleteOne({title: 'Carrot Cake'})
  .then(recipe => { console.log(`This recipe has been removed: ${recipe.title}`)})
  .catch(err => { console.error(`Error ocurred while removing: ${err}`)});

  process.on('SIGINT', () => {  
	  mongoose.connection.close(() => { 
	    console.log('Mongoose default connection disconnected through app termination'); 
	    process.exit(0); 
	  }); 
	}); 

