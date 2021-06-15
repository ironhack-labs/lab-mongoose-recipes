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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

    .then(async () => {
      // Run your code here, after you have insured that the connection was made
      try {
      // iteracion 2
        const newRecipe = await Recipe.create({
          title: "Pancakes",
          cuisine: "USA"
        })
        console.log(`The ${newRecipe.title} has been created`)
        
        //Iteracion 3
        const recipes = await Recipe.insertMany(data)
        recipes.forEach(recipe => {
        console.log(`${recipe.title}`)
        })

        // Iteracion 4
        const recipeUpdate = await Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 })
        console.log(`The duration of the recipe ${recipeUpdate.title} was updated to ${recipeUpdate.duration}`)

       // Iteracion 5 
        const recipeDelete = await Recipe.findOneAndDelete(
          { title: "Carrot Cake" }
        )
        console.log(`The recipe ${recipeDelete.title} was deleted`)


      } catch(err) {
        console.error('the new recipes has not been created' );
      }

    });
    // Iteracion 6
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
