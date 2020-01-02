const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Recipe is the name of our MODEL!

// Connection to the database "recipeApp"
// We can see the database in "mongo" (terminal: mongo) >> "show dbs" 
// Then, we use this database (still in mongo) >> "use nameOfDatabase"
// Finally can show collections of data by >> "show collections"
// To view in the terminal using MongoDB >> "db.collectionName.find()", adding any conditions as needed

// In order to print in the console just the titles of the recipe, do as follows below
// db.recipes.find({},{title:1, _id:0})

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


// Note that both the create and insertMany are asynchronous, which means they run in parallel and can end separately.

// Create hypothetical Rice Krispie recipe
let promise1 = Recipe.create({title: `Rice Krispie`, level:`Easy Peasy`,ingredients:[`rice`,`eggs`,`milk`],cuisine: `Homemade`,dishType:`Snack`,duration:2 ,creator:`Mom`})
  .then(Recipe => { console.log('The recipe Rice Krispie is saved and its value is: ', Recipe) })
  .catch(err => { console.log('An error happened:', err) });

// insertMany receives array 'data', passes thru Recipe conditions
let promise2 = Recipe.insertMany(data)
  .then(recipes => { console.log('The recipes are saved and their values are: ', recipes) })
  .catch(err => { console.log('An error happened:', err) });

let promise3 = Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(successCallback => {console.log('Success!')})
  .catch(errorCallback => {console.log('Failure...')});

let promise4 = Recipe.deleteOne({ title: "Carrot Cake"})
  .then(successCallback => {console.log('Success!')})
  .catch(errorCallback => {console.log('Failure...')});

  
Promise.all([promise1, promise2, promise3, promise4])
.then(values => {
  console.log("All data processes executed!");
  mongoose.connection.close();
})
.catch(err => console.error(err));