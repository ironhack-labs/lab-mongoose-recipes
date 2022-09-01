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
    // Before adding any recip  es to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {

    recipeModel = Recipe;

    const myRecipe1 = new recipeModel({
      title: "Cow with potatoes",
      level: "delicious",
      ingredients: "cow and more cow",
      cuisine: "my cousine",
      dishType: "breakfast",
      image: "",
      duration: 30,
      creator: "Mario",
      created: null




    });


    myRecipe1.save()
      .then((recipe) => {

        console.log(recipe);
      })

    const myRecipe2 = new recipeModel({
      title: "Spanish Omelette",
      level: "delicious",
      ingredients: "Potatoes, eggs",
      cuisine: "my cousine",
      dishType: "main_course",
      image: "",
      duration: 30,
      creator: "Mario",
      created: null




    });

    myRecipe2.save()
      .then((recipe) => {

        console.log(recipe);
      })

    const myRecipe3 = new recipeModel({
      title: "Cocrodile hamburger",
      level: "delicious",
      ingredients: "crocodile, eggs, bread etc.",
      cuisine: "my cousine",
      dishType: "other",
      image: "",
      duration: 30,
      creator: "Mario",
      created: null




    });

    myRecipe3.save()
      .then((recipe) => {

        console.log(recipe);
      })




    recipeModel.insertMany(data) // crear varios
      .then((recipes) => {
        console.log(recipes);
      })
      .catch((err) => {
        console.log(err);
      });

    recipeModel.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }) // UPDATE
      .then((recipe) => console.log('Success ', recipe))
      .catch((err) => {
        console.log(err);
      });

    recipeModel.deleteOne({ title: "Carrot Cake" });

    console.log("We are inside THEN");
    const RecipeModel = mongoose.model('Recipe', recipeSchema);

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
