const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

const pauloRecipe = {
  title: "Pasta Bolognese",
  level: "Easy Peasy",
  ingredients: ["Pasta", "Bolognese"],
  cuisine: "Italian",
  dishType: "Dish",
  duration: 10,
  creator: "Paulo"
};

mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log("Connected to the database");
    Recipe.create(pauloRecipe)
      .then(recipe => {
        console.log(recipe.title);
        Recipe.insertMany(data)
          .then(recipes => {
            recipes.forEach(recipe => console.log(recipe.title));
            Recipe.updateOne(
              { title: "Rigatoni alla Genovese" },
              { duration: 100 }
            )
              .then(updatedRecipe => {
                console.log(updatedRecipe);
                Recipe.deleteOne({ title: "Carrot Cake" })
                  .then(() => {
                    console.log("Carrot cake deleted");
                    mongoose.connection
                      .close()
                      .then(() => {
                        console.log("closed");
                      })
                      .catch(err => console.log("Error closing", err));
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));


// // Connection to the database "recipeApp"
// mongoose
//   .connect('mongodb://localhost/recipe-app-dev', {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
//   .catch(err => console.error('Error connecting to mongo', err));

// function createRecipe(title, level, ingredients, cuisine, dishType, duration, creator){
//   Recipe.create({
//     title,
//     level,
//     ingredients,
//     cuisine,
//     dishType,
//     duration,
//     creator
//   })
//   .then(res => {
//     console.log(title);
//     mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error(err);
//   });
// };

// // ITERATION 2 - CREATING A RECIPE
// // createRecipe("Pasta Bolognese", "Easy Peasy", ["pastas", "bolognese"], "Italian", "Dish", 10, "Paulo");

// // ITERATION 3 - INSERT MULTIPLE RECIPES
// function importMany(recipes){
//   Recipe.insertMany(recipes)
//   .then(res => {
//     recipes.map(item => console.log(item.title));
//     mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error(err);
//   });
// };

// // importMany(data);


// // ITERATION 4 - UPDATE RECIPE
// function updateRecipe(recipeTitle, newDuration){
//    Recipe.findOneAndUpdate({title: recipeTitle}, {duration: newDuration})
//    .then(res => {
//      console.log("Success!", res);
//      mongoose.disconnect();
//    })
//    .catch(err => {
//      console.error(err)
//    });
// }; 

// updateRecipe("Rigatoni alla Genovese", 100);