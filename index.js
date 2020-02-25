const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model'); 
// Import of the data from './data.js'
const data = require('./data.js');        

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev-02', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {  
    let allRecipes = [];
    for(let i = 0; i < data.length; i++){
      let recipe = new Recipe;
      recipe.title = data[i].title;
      recipe.level = data[i].level;
      recipe.ingredients = data[i].ingredients;
      recipe.cuisine = data[i].cuisine;
      recipe.dishType = data[i].dishType;
      recipe.duration = data[i].duration;
      recipe.creator = data[i].creator;
      recipe.created = data[i].created;
      allRecipes.push(recipe);
    }
    // Iteration 2 and 3
    // Recipe.insertMany(allRecipes, function(error, docs) {});
    return allRecipes
  })
  .then(title => {
    for(let a = 0; a < title.length; a++){
      console.log(title[a].title);
    }
    return 'Rigatoni alla Genovese';
  })
  .then(titleUpload =>{
    const query = { title: titleUpload};
    return Recipe.updateOne(query, {duration: 100});
  })
  .then(update => {
    console.log('save');
    return 'Carrot Cake';
  })
  .then(titleUpload =>{
    const query = { title: titleUpload};
    return Recipe.deleteOne(query);
  })
  .then(deleteOne => {
    console.log('delete');
    return 'close';
  })
  .finally( 
    mongoose.connection.close()
  )