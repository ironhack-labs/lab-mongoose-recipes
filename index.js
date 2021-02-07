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
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Create new Recipe
    Recipe.create({
      title: 'Margarita',
      level: 'Easy Peasy',
      ingredients: ['1 1/2 ounces silver tequila',
        '1 ounce orange liqueur (Cointreau, Grand Marnier or Triple Sec)',
        '3/4 ounce freshly-squeezed lime juice',
        'optional sweetener: agave nectar or simple syrup, to taste',
        'ice',
        'optional: lime wedge and coarse salt for rimming the glass'],
      cuisine: 'Mexican',
      dishType: 'drink',
      image: 'https://www.gimmesomeoven.com/wp-content/uploads/2015/05/Classic-Margarita-Recipe-4.jpg',
      duration: 5,
      creator: 'Patrick'
    })
      .then(recipe => {
        console.log(`New recipe: ${recipe.title} added`)
      })
      .then(() => {
        // Insert recipes from json file
        Recipe.insertMany(data)
          .then(recipes => recipes.forEach(recipe => console.log(`New recipe: ${recipe.title}' is added`)))
          .then(() => {
            // Update Rigatoni alla Genovese
            Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
              .then(recipe => console.log(`'${recipe.title}' is successfully updated`))
              .catch(error => console.log('Error updating a recipe', error));
            // Delete carrot cake  
            Recipe.deleteOne({ title: "Carrot Cake" })
              .then(result => {
                if (result.deletedCount > 0) console.log('Successfully deleted recipe');
                else console.log("Recipe not found, make sure you entered the correct title");
                // Close the database
                mongoose.connection.close();
              })
              .catch(error => console.log('Error deleting a recipe', error));
          })
          .catch(error => console.log('Error creating new recipes', error));
      })
      .catch(error => console.log('Error creating new recipes', error));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
