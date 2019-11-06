const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to Mongo!');
    return Recipe.create({
      title: 'Tartiflette Veggie',
      level: 'Easy Peasy',
      ingredients: ['Potatoes', 'Zucchini', 'Peppers', 'Reblochon', 'Onions'],
      cuisine: 'French',
      dishType: 'Dish',
      image: 'https://www.picard.fr/dw/image/v2/AAHV_PRD/on/demandware.static/-/Sites-catalog-picard/default/dw4f25b129/recettes/plats/R0625.jpg?sw=600&sh=336',
      duration: 35,
      creator: 'Camille & Helene chefs',
    });
  })
  .then((createdRecipe) => {
    console.log(createdRecipe);
    console.log(createdRecipe.title);
    return Recipe.insertMany(data);

  }).then(recipes => {
    recipes.forEach(recipe => console.log(recipe.title));

  }).then(() => {
    return Recipe
      .findByIdAndUpdate("5dc2efc85fbc5e736fcadcb9", {
        duration: 100
      });

  }).then(() => {
    console.log("updated reciped");
    return Recipe.deleteOne({
      title: "Carrot Cake"
    });
  }).then(() => {
    console.log("Carrot cake deleted !");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Recipe // uncomment to not insertMany each time we run our code...
// how do the web dev in real life ? they uncomment their code each time ??
//   .insertMany(data)
//   .then(data.forEach(recipe => console.log(recipe.title)))
//   .catch(err => {
//     console.error('Failed to insert document', err);
//   });

// asyn way to do it with franck
// async function doSomethingLaterButHappenWhenIWant(callback) {
//   try{
//     const createdRecipe = await Recipe.create({
//       title: "il ppppppp di la mama",
//       ingredients: ["Pasta", "Mama", "Bolognaise", "amor"],
//       cuisine: "hood cuisine",
//       duration: 180,
//       creator: "Mama"
//     });
//     const allMyRecipes = await Recipe.insertMany(data);
//     const updatedRecipe = await Recipe.findOneAndUpdate(
//       { title: "Rigatoni alla Genovese" },
//       { duration: 100 }
//     );
//     await Recipe.findOneAndDelete({ title: "Carrot Cake" });
//     mongoose.connection.close();
//   }catch(err){
//     console.log(err)
//   }
// }