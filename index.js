const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then((recipes) => {
    // Run your code here, after you have insured that the connection was made
    console.log('All existing recipes removed', recipes);

    // Iteration 2 - Create a recipe
    // In index.js, after the connection to the database has been established,
    // you should add a new recipe document to the database by calling the
    // Model.create static, passing it the recipe details as an object. After
    // inserting the recipe, you should console.log the title of the recipe.

    return Recipe.create([
      {
        title: 'Food order',
        level: 'Easy Peasy',
        ingredients: ['GlovoApp', 'Bank Account', 'Hunger'],
        cuisine: 'Glovo',
        dishType: ['main_course'],
        duration: 20,
        creator: 'Julia'
      }
    ]);
  })
  .then((recipes) => {
    console.log('First recipe added', recipes);

    // Iteration 3 - Insert multiple recipes
    // We are importing an array of recipes form the data.json file.
    // Using the Model.insertMany static, you should add the entire array
    // to the database. After inserting the documents, print the title
    // of each recipe to the console.

    return Recipe.insertMany(data, function (err, data) {
      if (err != null) {
        console.log(err);
      } else {
        console.log(data);
        // console.log(data.ops);
      }
    });
  })
  .then((recipes) => {
    console.log('Recipes added: ', recipes);

    // Iteration 4 - Update recipe
    // Now you should have six different recipes in the database, but
    // there was a mistake in one of them. The Rigatoni alla Genovese
    // does not take that long. You should update the duration field and
    // set it to 100. You might want to use the Model.findOneAndUpdate static.
    // After updating it, print a success message!

    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })
  .then((recipes) => {
    console.log('Success: Recipe updated: ', recipes);

    // Iteration 5 - Remove a recipe
    // Oh oh! The Carrot Cake is no longer available, so we need to remove it
    // from the database. Using the Model.deleteOne static, remove that recipe
    // from the database and display a success message after doing it!

    return Recipe.deleteOne({
      title: 'Carrot Cake'
    });
  })
  .then((recipes) => {
    console.log('Recipe deleted', recipes);

    // Iteration 6 - Close the Database
    // After completing every task, you need to close the database. Otherwise,
    // the connection will stay open until the node.js process dies. Pay
    // attention to the asynchronicity of the operation. You should only close
    // the connection after everything is done! 😉

    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Was disconnected from MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
