require('./config/db.config');
const Recipe = require('./models/recipe.model');
const recipes =require('./data.js')
const mongoose = require('mongoose');

const recipe = new Recipe({
    title: 'Asian Glazed Chicken Wings',
    level: 'Amateur Chef',
    ingredients: [
      '1/2 cup rice vinegar', 
      '5 tablespoons honey', 
      '1/3 cup soy sauce (such as Silver Swan®)', 
      '1/4 cup Asian (toasted) sesame oil', 
      '3 tablespoons Asian chili garlic sauce', 
      '3 tablespoons minced garlic', 
      'salt to taste', 
      '8 skinless, boneless chicken thighs'
  ],
    cuisine: 'Asian',
    dishType: ['Dish'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 40,
    creator: 'Chef LePapu' 
});

// Recipe.create(recipe)
//   .then(recipe => {console.log(recipe.title)})
//   .cath(err => {console.log('error')})

Recipe.create(recipe)
.then((recipe) => {
    console.info('========== Iteration 2');
    console.info('- Created recipe', recipe.title);
    return Recipe.insertMany(recipes)
  })
  .then((recipes)=> {
    for (let recipe of recipes){
      console.info('- Created recipe', recipe.title)
    }
    return Recipe.findOneAndUpdate(
      {title: 'Rigatoni alla Genovese'},
      {$set: {duration: 100}},
      {new: true})
    })
    .then((recipe)=> {
      console.info(`${recipe.title} Recipe updated`)
      return Recipe.findOneAndRemove({title: 'Carrot Cake'});
    })
    .then((recipe) => {
      console.info(`${recipe.title} removed!`);
    })
  .catch(error=> {
    console.log('There is a problem with the recipe',error)  
  })
  .then(()=> {
    return mongoose.connection.dropDatabase()
  })
  .then(()=>{
    return mongoose.connection.close()
  }
  )
  .catch(error=> {
  console.log('There is a problem with the recipe',error)  
  })