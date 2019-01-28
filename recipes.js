const data = require('./data.js');
const Recipe = require('./models/recipe_entries.js');

//Iteration 2

Recipe.create({
  title: "Ceviche",
  level: 'UltraPro Chef',
  ingredients: ['Fish', 'Salt', 'Onion'],
  cuisine: 'International',
  dishType: 'Dish',
  creator: 'Gaston'
})
  .then( newRecipe => {
    console.log(`Recipe ${newRecipe.title} was added`);
  })
  .catch(err => {
    console.log("An error happened ", err);
})

//Iteration 3

Recipe.insertMany(data)
.then( (newRecipe) => {
    console.log('Recipes added are: ', newRecipe)
   })
  .catch ( (err) => {
     console.log('Error ocurred when inserting many recipes: ', err)
  })

