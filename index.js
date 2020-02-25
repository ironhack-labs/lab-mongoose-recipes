const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); 
const data = require('./data.js');        

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
  })
  .finally(() => {
    console.log('Cerrada');
    mongoose.connection.close()
  });