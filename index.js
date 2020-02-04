const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));



//Iteration2
//  function (     )
Recipe.create({title : "crepe",level :"Easy Peasy",ingredients:["banana", "chocolate"], cuisine: "French", dishType: "Dessert",image: "",duration: 10, creator: "Moi", date : 2020-01-29})

  //Iteration3

function insertAll() {
  Recipe.insertMany(data)
  .then(recipes => console.log("recipes saved"  ))
  .catch(error =>
    console.log('An error happened while saving a new recipe:', error)
  );
}

insertAll()


//Iteration 4

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(recipes => console.log("recipe updated"))
  .catch(error =>
    console.log('An error happened while updating a new recipe:', error))

//Iteration 5
Recipe.deleteOne({ title: 'Carrot Cake' })
.then(recipes => console.log("recipe deleted"))
.catch(error =>
    console.log('An error happened while deleted a recipe:', error))

//Iteration 6


