const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const modelRecipe = require('./models/model.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  modelRecipe.deleteMany({})
  .then()
  .catch();

  let myRecipe = new modelRecipe (
  {
    title: 'Ratatouille',
    level: 'UltraPro Chef',
    ingredients: [
      '1 onion, sliced thin',
      '2 garlic cloves, minced',
      '5 tablespoons olive oil',
      '3/4-pound eggplant, cut into 1/2-inch pieces (about 3 cups)',
      '1 small zucchini, scrubbed, quartered lengthwise, and cut into thin slices',
      '1 red bell pepper, chopped',
      '3/4 pound small ripe tomatoes, chopped coarse (about 1 1/4 cups)',
      '1/4 teaspoon dried oregano, crumbled',
      '1/4 teaspoon dried thyme, crumbled',
      '1/8 teaspoon ground coriander',
      '1/4 teaspoon fennel seeds',
      '3/4 teaspoon salt',
      '1/2 cup shredded fresh basil leaves'
    ],
    cuisine: 'French',
    dishType: 'Dish',
    image: 'https://images.media-allrecipes.com/images/75131.jpg',
    duration: 100,
    creator: 'Chef Manny'
  });

  myRecipe.save().then(console.log(myRecipe.title));
 
  modelRecipe.insertMany(data).then(recipes =>
  {
    for (recipe of recipes)
    {
      console.log(recipe.title)
    }

    modelRecipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }).then(
      console.log('success')
    );

    modelRecipe.deleteOne({ title: 'Carrot Cake' }).then(console.log('success'));
  });

  //Close Connection
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });
  
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose default connection disconnected through app termination'
      );
      process.exit(0);
    });
  });
  