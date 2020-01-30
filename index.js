const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

const recipeXe = {
  title: "YOLO",
  level: "Easy Peasy",
  ingredients: ["R", "Rbis"],
  cuisine: "Degun",
  dishType: "Other",
  duration: 3,
  creator: "Xe",
};

async function createRecipes() {
  try {
    // Connection to the database "recipeApp"
    const x = await mongoose.connect('mongodb://localhost/recipe-app-dev', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const recipe = await Recipe.create(recipeXe);
    console.log(recipe.title);

    const recipes = await Recipe.insertMany(data);
    recipes.forEach(recipe => console.log(recipe.title));

    const uptdatedRecipe = await Recipe.updateOne({
      title: "Rigatoni alla Genovese"
    }, {
      duration: 100
    });
    console.log("Success, duration updated!");

    const deletedRecipe = await Recipe.deleteOne({
      title: "Carrot Cake"
    });
    console.log("Success, Carrot Cake deleted!");

    await mongoose.connection.close();

  } catch (err) {
    console.log(err);
  }
}

createRecipes();


// .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
// .catch(err => console.error('Error connecting to mongo', err));


/* const recipeXe = Recipe.create({
  title: "YOLO",
  level: "Easy Peasy",
  ingredients: ["R", "Rbis"],
  cuisine: "Degun",
  dishType: "Other",
  duration: 3,
  creator: "Xe",
});

recipeXe
  .then(x => console.log(`${x.title}`))
  .catch(err => console.log(err));

Recipe.insertMany(data);

Recipe.find()
    .then(res => res.forEach(x => console.log(`${x.title}`)))
    .catch(err => console.log(err));

Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
  .then(res => console.log("Success, duration updated!"))
  .catch(err => console.log(err));

Recipe.deleteOne({title: "Carrot Cake"})
  .then(res => console.log("Success, Carrot Cake deleted!"))
  .catch(err => console.log(err)); */