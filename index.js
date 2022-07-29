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
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()
  })

  /* Recipe.create({
    title: "Asiatic Food",
    level: "Amateur Chef",
    ingredients: ["1/2 cup rice vinegar", "5 tablespoons honey", "1/3 cup soy sauce (such as Silver Swan®)", "1/4 cup Asian (toasted) sesame oil", "3 tablespoons Asian chili garlic sauce", "3 tablespoons minced garlic", "salt to taste", "8 skinless, boneless chicken thighs"],
    cuisine: "Asian",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    duration: 40,
    creator: "Chef LePapu"
  })
  .then((createdRecipe) => { 
    console.log(createdRecipe)
  }) */
  
  /* Recipe.insertMany([...data])
  .then((recipes) => { console.log(recipes)
  })  */

  /* Recipe.findByIdAndUpdate('62e40499c6da5f0206a9b13a', {duration: 100})
  .then((recipe) => { 
    console.log(`${recipe} updated`)
  }) */

  Recipe.deleteOne({title: 'Carrot Cake'})
  .then((recipe) => {
    console.log(`${recipe} do not exist`)
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  async function recipes(){
    try {
      let oneRecipe = await Recipe.create({
        title: "Asiatic Food",
        level: "Amateur Chef",
        ingredients: ["1/2 cup rice vinegar", "5 tablespoons honey", "1/3 cup soy sauce (such as Silver Swan®)", "1/4 cup Asian (toasted) sesame oil", "3 tablespoons Asian chili garlic sauce", "3 tablespoons minced garlic", "salt to taste", "8 skinless, boneless chicken thighs"],
        cuisine: "Asian",
        dishType: "main_course",
        image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        duration: 40,
        creator: "Chef LePapu"})
        
      console.log(oneRecipe)
    {
      let twoRecipe = await Recipe.create
      console.log(twoRecipe)
    }
    {
      let thirdRecipe = await Recipe.create
      console.log(thirdRecipe)
    }
    {
      let fourthRecipe = await Recipe.create
      console.log(fourthRecipe)
    }
    {
      let fifthRecipe = await Recipe.create
      console.log(fifthRecipe)
    }
    {
      let sixthRecipe = await Recipe.create
      console.log(sixthRecipe)
    }
    } catch (error) {
      console.log(error)
    }
  }

  recipes();
