const data = require('./data.js')
const Recipe = require('./models/recipe.model');
require('./configs/db.config');

//Iteration 1 
/* Recipe.create({ title: 'Test1'}, function (err, recipe) {
    if (err) console.log('An error happened:', err);
    else console.log('The recipe is saved and its value is: ', recipe.title);
  }); */


//Iteration 1 using promise
/* Recipe.create({ title: 'Recipay' })
  .then((result) => { console.log('The recipe is saved and its value is: ', result) })
  .catch((err) => { console.log('An error happened:', err) });
 */

//iteration 2 using promise
Recipe.insertMany(data)
  .then((result) => { console.log('The recipes are saved and they are: ', result) })
  .catch((err) => { console.log('An error happened:', err) });

  