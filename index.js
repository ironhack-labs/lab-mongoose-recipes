const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// When successfully connected
mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));


  // create a recipe
  Recipe
    .create({
      title: `Tuna Salad`,
      cuisine: "Seafood",
      image: "https://ccs1-jl7jxm3ukfwyutip.netdna-ssl.com/wp-content/uploads/2019/03/avocado-tuna-salad-in-white-bowl-long-A.jpg"
    })
    .then( recipeDoc => console.log(`Recipe .create() success: `, recipeDoc.title))
    .catch( error => console.log(`Recipe .create() failure`, error)); 

  
  // insert array of recipes from data.js
  Recipe.insertMany(data);


// console the title of each recipe
function showRecipes() {
  console.log(`ALL THE RECIPES`);
  Recipe
    .find()
    .then(recipesFromDB => {
      recipesFromDB.forEach(oneRecipe => console.log(`  --> recipe: ${oneRecipe.title}`))
    })
    .catch(err => console.log(`Error occured during getting recipe from DB: ${err}`)) 
  } 

  
// update recipe
async function update(recipeName){
  const res = await Recipe.updateOne({ title: recipeName}, { duration: 100 });

  console.log(`Recipe Update Successful`)
  res.n; // number of documents matched
  console.log(res.nModified); // number of documents modified
  console.log(res);
}

update(`Rigatoni alla Genovese`);

// remove a recipe
async function remove(recipeName){
  const res = await Recipe.deleteOne({ title: recipeName})

  console.log(`Recipe Removal Sucessfull`);
  res.n; // number of documents matched
  console.log(res.nModified); // number of documents modified
  console.log(res);
}


remove(`Carrot Cake`);

// When the connection is disconnected
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});



// we have to wait for our recipes to save before displaying them
setTimeout(showRecipes, 1000);

// close the connection
function close(){
  mongoose.connection.close();
}
setTimeout(close, 9000);

