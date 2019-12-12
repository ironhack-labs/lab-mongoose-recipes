const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
// MDH: store result in db so we can disconnect it at the end!!!
const db=mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

var promises=[];

// Iteration 2 - Create a recipe
console.log("\n****** Inserting recipe 'Papa''s Pancakes' *******");
promises.push(Recipe.create({
        title:"Papa's Pancakes",
        level:'Easy Peasy',
        ingredients:['flour','yeast','milk','eggs','butter/oil','salt'],
        cuisine:'Dutch',
        dishType:'Other',
        duration:30,
        creator:'Marc P. de Hoogh',
        created:new Date()
      })
      .then((recipe)=>{
        console.log("Recipe '"+recipe.title+"' created!");
      })
      .catch((err)=>{
        console.error(err);
      })
);

// Iteration 3 - Insert many recipes
console.log("\n****** Inserting many recipes *******");
// 1. get the array of the recipes
//// not needed (see top): var data=require('./data.js');
// 2. insert all of them
promises.push(
  Recipe.insertMany(data)
      .then((recipes)=>{
        recipes.forEach((recipe)=>{console.log("Recipe '"+recipe.title+"' inserted!");});
      })
      .catch((err)=>{
        console.log("Some error inserting many recipes:");
        console.error(err);
      })
);

// Iteration 4 - Update recipe
promises.push(
  Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{'duration':100},{new:true})
      .then((recipe)=>{
        console.log("Duration of recipe '"+recipe.title+"' updated to "+recipe.duration+".");
      })
      .catch((err)=>{
        console.log("Some error updating the recipe:");
        console.error(err);
      })
);

// Iteration 5 - Remove a recipe
promises.push(
  Recipe.deleteOne({title:'Carrot Cake'})
      .then((result)=>{
        if(result.deletedCount>=1)
          console.log("'Carrot Cake' recipe deleted!");
        else
          console.error("Apparently failing to delete the 'Carrot Cake' recipe.");
      })
      .catch((err)=>{
        console.log("Some error removing the 'Carrot Cake' recipe:");
        console.error(err);
      })
);

// Iteration 6 - Close the database when done with all
Promise.all(promises)
      .then((results)=>{
          console.log("\n****** Done without any errors ******");       
          mongoose.connection.close();
          console.log("\n****** Mongoose connection closed! ******");
        })
      .catch((err)=>{
        console.log("\n****** Done with SOME errors ******");       
        mongoose.connection.close();
        console.log("\n****** Mongoose connection closed! ******");
        console.log("\n****** Done ******");        
      });
