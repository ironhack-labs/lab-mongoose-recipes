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

  //Iteration 2//

  /*
const name = new Recipe({
  title: 'Carbonara',
  level: 'Easy Peasy',
  ingredients: ["Espaguettis", "Nata", "Huevo", "Bacon"],
  cuisine: "Italiana",
  dishType: "Pasta",
  duration: 20,
  creator: "Julián",
  
})*/
  

//Iteration 3//
/*
Recipe.insertMany(data)
.then((data) => console.log(data))
.catch((err) => console.log(err))
*/



//Iteration 4//
/*
Recipe.updateOne({title : "Rigatoni alla Genovese"}, {duration : 100})
.then(console.log(`Success!`))
.catch(console.log(`Critical error!`))
*/

//Iteration 5//
/*
Recipe.deleteOne({title : "Carrot Cake"})
.then(console.log('success!'))
.catch(console.log('Critical error!'))
*/

//Iteration 6//
