const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data     = require('./data.js');

mongoose.connect('mongodb://localhost/myRecipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

//Iteration#1 create new Schema
const recipeSchema = new Schema ({
  title       : {type : String, required : true, unique : true},
  level       : {type : String, enum : ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients : [],
  cuisine     : {type : String, required : true},
  dishType    : {type : String, enum : ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image       : {type : String, default : 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration    : {type : Number, min: 0},
  creator     : {type : String},
  created     : {type : Date, default : Date.now}
})

//Iteration#2 Use the Model.create method to pass the info to create a new recipe
const Recipe = mongoose.model('Recipes', recipeSchema);


Recipe.create({
  title   : 'Homemade Beef Stroganoff',
  level   : 'Amateur Chef',
  ingredients : ['2 Pounds Beef Round Steak', 'Salt & Pepper', '4 Tablespoons Butter', '2 Cups Sliced Mushrooms', 'Onion'],
  cuisine     : 'American',
  dishType    : ['Dish'],
  duration    : 30,
  creator     : 'Chef Pepin'
})
  .then(recipe => { console.log('The new recipe is: ', recipe.title)})
  .catch(err => { console.log('An error happened: ', err)})

//Iteration#3 Use Model.insertMany method to add the entire array to the database
Recipe.insertMany(data)
  .then( newRecipe => {
    console.log(`Recipes has been added to DB: ${newRecipe}`);
    newRecipe.forEach(({title})=>console.log(`Title is ${title}`));
    //Iteration#4 Use the updateOne method to odify the duration property of one document
    Recipe.deleteOne({title: 'Carrot Cake'})
      .then(recipe => { console.log( 'The recipe "Carrot Cake" has been deleted successfully: ')})
      .catch(err => { console.log( 'An error has happened while updating one document: ', err)})
    //Iteration#5 Use the Model.remove method to delete one document from database
    Recipe.updateOne({title : 'Rigatoni alla Genovese' }, {duration : 100})
        .then( updatedRecipe => { 
          console.log( 'The duration of Rigatoni alla Genovese has been updated successfully: ' );
        })
        .catch(err => { 
          console.log( 'An error has happened while updating one document: ', err);
        })
  })
  .catch(error => {
    console.log("Error adding all recipes to DB: ", error);
  })


// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', () => { 
		mongoose.connection.close(() => { 
			console.log('Mongoose default connection disconnected through app termination'); 
			process.exit(0); 
		}); 
}); 