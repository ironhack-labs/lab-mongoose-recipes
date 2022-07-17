const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
   
    const body = {
    title: "Porchetta",
    ingredients: ["Pork", "Onions", "Garlic"],
    cuisine: "Italian",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    level:  "UltraPro Chef",
    dishType: "main_course",
    duration: 120,
    creator: "Chef Juan",
    }
    
    //Creating a new recipe
    return Recipe.create(body)
      .then(recipe => console.log('recipe created: ', recipe.title))
      .catch(err => console.error(err))
  }) 

   //Insert many recipes 
  .then(() =>  {  
    return Recipe.insertMany(data)
      .then(recipes => {
        recipes.forEach(recipe => {
        console.log(recipe.title)
        })    
      })
    })

  //Updating a recipe
  .then(() => {
   return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" }, 
      { duration: 100 },
      { new: true }
    )
      .then(() => 
        console.log('Successfully updated!'));
    })

  //Delete one
  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
    .then(() => 
    console.log(`Recipe successfully removed`));
  })
    .catch(err => console.error(err))

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
