/* const Recipe = require('./models/recipe.model');
require('./configs/db.config');


Recipe.create({ title: 'Test'}, function (err, recipe) {
    if (err) console.log('An error happened:', err);
    else console.log('The recipe is saved and its value is: ', recipe);
  }); */

/* const recipe = new Recipe({
    title: 'Recipe test'
  }); 
  recipe.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('new recipe');
    }
  });


  Recipe.find({}, (err, recipes) => {
      recipes.forEach((recipe) => {
        console.log(' --> recipe: ', recipe.title)
      });
  }) */