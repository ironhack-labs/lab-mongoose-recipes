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

Recipe.insertMany(data)
  .then(
    recipes => {recipes.map(recipe => console.log(recipe.title))})
  .then(()=> {
    console.log("Rigatoni's duration is being updated")
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then(() => {
    console.log("Bye bye Carrot Cake, we're removing it")
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })

  .then(() => {
    console.log("Closing the database !");
    mongoose.connection.close();
  })
   
     
  .catch(error => console.log('An error happened while creating the data:', error)
);



  //recipes.forEach(recipes => console.log(` --> title: ${recipes.name}`))

