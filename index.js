const mongoose = require('mongoose');
const express = require('express');
const hbs = require('hbs');
const path = require('path');


const app = express();

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

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
  
    Recipe
      .create({
        title: "Asian Glazed Tofu Thighs",
        level: "Amateur Chef",
        ingredients: [
          "1/2 cup rice vinegar",
          "5 tablespoons honey",
          "1/3 cup soy sauce (such as Silver Swan®)",
          "1/4 cup Asian (toasted) sesame oil",
          "3 tablespoons Asian chili garlic sauce",
          "3 tablespoons minced garlic",
          "salt to taste",
          "8 firm tofu pieces"
        ],
        cuisine: "Asian",
        dishType: "main_course",
        duration: 40,
        creator: "Chef LePapu"
      })
      .then(recipe => { console.log('Recipe created: ', recipe.title); })

    Recipe
      .insertMany(data)
      .then((newRecipes)=> {
        newRecipes.forEach(function(recipe) {
          console.log(`New recipe added: ${recipe.title}`);
        })
      })
      .then(() => {
        return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration: 100})
      })
      .then((updatedRecipe) => {
        console.log(`Recipe updated: ${updatedRecipe.title}`);
      })
      .then(() => {
        return Recipe.findOneAndDelete({title: "Carrot Cake"})
      })
      .then((recipeDeleted) => {
        console.log(`Deleted ${recipeDeleted.title}`);
      })
      .then(() => {
        mongoose.connection.close(function(){
          console.log("Connection is closed");
        })
    });
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//If you'd like to see the recipes, comment the last .then (connection.close()) and uncomment the below.
//   Recipe
//   .find({})
//   .then(recipes => {
//     res.render('index',{recipes: recipes});
//   });
// })
  
app.listen(3000, () => console.log('🏃‍ on port 3000'));
