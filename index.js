const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model.js');

// Import of the data from './data.json'
const data = require('./data.json');


const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(async x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    


      // Close the MongoDB database connection
      mongoose.connection.close()
      
      .then(() => {
        console.log('Database connection is closed.');
    })

    /* ITERATION 5 - Remove record Carrot Cake 
  
    Recipe.deleteOne({title: "Carrot Cake"})
     
    .then(() => {
        console.log('Record  is removed');
    })
    */

  
    /* ITERATION 4 - Update record 
  
    //return Recipe.deleteMany()
    //await Recipe.deleteMany();

    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 101}, { returnDocument: 'after' })
     
    .then(() => {
        console.log('Record  is finally updated');
    })
    */

    // Add insert Many 
    /*  ITERATION 3
    Recipe.insertMany(data)
      .then(addedRecipes => {
        console.log('${addedRecipes.length} added to database');

        // Print the each recipe
        addedRecipes.forEach(recipe => {
          console.log(`Recipe title: ${recipe.title}`);
        });
      })

     
      */

/* ITERATION 3
 // Add insert Many
    Recipe.insertMany(data)
      .then(addedRecipes => {
        console.log('${addedRecipes.length} added to database');

        // Print the each recipe
        addedRecipes.forEach(recipe => {
          console.log(`Recipe title: ${recipe.title}`);
        });
      })
*/


    /*  ITERTATION 2
    // Creating new dataset
    const newRecipe = {
      title: "Pasta",
      level: "Amateur Chef",
      ingredients: ["pasta", "tomatoes", "cheese"],
      dishType: "breakfast",
      duration: 25,
      creator: "Divya123",
    };

    // Insert into Mongo new data , Iteration 3 - insert many
    Recipe.create(newRecipe, (error, createdRecipe) => {
      if (error) {
        console.error("Error creating new recipe:", error);
      } else {
        console.log(`Created recipe 1: ${createdRecipe.title}`);
      }
    });
    console.log(`New recipe 2: ${createdRecipe.title}`);
    */

    .catch (error => {
      console.error('Error updating data recipes', error);
    });
  })

.catch (error => {
  console.error('Error connecting to the database', error);
});

