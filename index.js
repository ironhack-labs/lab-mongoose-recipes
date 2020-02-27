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

  
//Iteration 2:
/*
.then(()=> {
  Recipe.create(data(0))
    .then((NewRecipe => console.log("Recipe saved. The title is: ", NewRecipe.title)))
    .catch(err => console.error("error", err))
}).catch()

*/

//Iteration 3:

.then(()=> {
  Recipe.insertMany(data)
    .then((NewRecipe => console.log("Recipes inserted", NewRecipe)))
    .catch(err => console.error("error", err))
  return Recipe.insertMany(data)
}).catch()
                         



//Iteration 4:

.then(()=> {
  Recipe.findByIdAndUpdate("5e559a23822c3d456923c4e5", {duration: 100})
    .then((NewRecipe => console.log("Duration update", NewRecipe)))
    .catch(err => console.error("error", err))
}).catch()


//Iteration 5:

.then(()=> {
  Recipe.deleteOne({title: "Carrot Cake"})
    .then((console.log("Carrot Cake was deleted")))
    .catch(err => console.error("error", err))
}).catch()


//Iteration 6:

.finally(() => {
  mongoose.connection.close();
});
