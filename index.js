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

    // Recipe.create(data[0])
    //   .then(aRecipe => console.log(`${aRecipe.title}`))
    //   .catch(error => console.log(error))

    Recipe.findOneAndUpdate(
      {duration: {$gte: 220}},
      {duration: 100}
    )
    .then(time2cook => console.log('Rigatoni alla Genovese duration has been updated'))
    .catch(error => console.log(error))


  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  Recipe.insertMany(data)
  .then(allRecipes => allRecipes.forEach(recipe => console.log(recipe.title)))
  .catch(error => console.log(error))


//

// Recipe.deleteOne({title: "Carrot Cake"})
//    .then(delRecipe => console.log('Carrot Coke is no longer available'))
//    .catch(error => console.log(error))

// mongoose.connection.close()
