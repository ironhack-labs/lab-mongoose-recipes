const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
    // Iteration 2
    const myRecipe = new Recipe({
      title: 'Arroz con leche',
      level: 'Easy Peasy',
      cuisine: 'International',
      dishType: 'dessert'
    });
    Recipe.create(myRecipe)
      .then(recipe => console.log(`New recipe "${recipe.title}" added`))
      .then(() => {
        // Iteration 3
        Recipe.insertMany(data)
          .then(() => {
            Recipe.find()
              .then(recipes => {
                console.log('List of recipes:')
                recipes.forEach(oneRecipe => console.log(`-> Recipe title: ${oneRecipe.title}`))
              })
              .catch(err => console.log(err))
          })
          .then(() => {
            // Iteration 4
            Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
              .then((recipe) => console.log(`Recipe "${recipe.title}" succesfully updated`))
              .then(() => {
                // Iteration 5
                Recipe.deleteOne({title: 'Carrot Cake'})
                  .then(() => {
                    console.log('Recipe succesfully deleted')
                    // Iteration 6
                    mongoose.connection.close()
                  })
                  .catch(err => console.log('Error deleting: ' + err))
              })
              .catch(err => console.log('Error updating: ' + err))
          })
          .catch(err => console.log('Error inserting data: ' + err))
      })
      .catch(err => console.log('Error creating a recipe: ' + err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
