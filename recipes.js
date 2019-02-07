let mongoose = require('mongoose');
const Schema   = mongoose.Schema;
let Recipe = require('./models/Recipe');
const data = require('./data.js');



mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

//Iteracion 2 Create a recipe


Recipe.create({
    title: "Galletas de la abuela",
    cuisine: "Tradional",
    duration: 30
})
    .then( (recipe)=> {
        console.log(recipe.title)
    })
    .catch(e=>console.log(e));

//Iteracion 3 Insert many

Recipe.insertMany(data)
    .then( (recipes)=> {
         recipes.forEach(function(e){
             console.log(e.title)
         })

    })
    .catch(e=>console.log(e));


//Iteracion 4 Update duration

Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration:100})
    .then((recipe)=>{console.log(recipe)})
    .catch(e=>console.log(e));



//Iteracion 5 Delete carrot cake
Recipe.deleteOne({title: 'Carrot Cake'})
    .then((s)=>{console.log(s)})
    .catch(e=>console.log(e));


//Iteracion 6 Close

mongoose.connection.close();