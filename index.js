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
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .then(() => {
    return Recipe.deleteMany({});
  })

  
//Iteration 2:
/*
.then(()=> {
  Recipe.create(data(0))

*/

//Iteration 3:

.then((recipe)=> {
  //console.log(`The recipe is ${recipe}`)
  return Recipe.insertMany(data)
})
                         



//Iteration 4:

.then((recipes)=> {
  console.log("Recipes inserted", recipes);
  return Recipe.updateOne({title: 'Rigatoni alla Genovese' },  {duration: 100})
})

//Iteration 5:

.then((recipe)=> {
  console.log("Duration update", recipe)
  return Recipe.deleteOne({title: "Carrot Cake"})
})


//Iteration 6:

.finally(() => {
  mongoose.connection.close();
});
