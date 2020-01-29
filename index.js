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
  .then( async x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
    .then(
    /* const myRecipe = {
      title: 'Ensalada de atún',
      level: 'Easy Peasy',
      ingredients: ,
      cuisine: 'International',
      dishType: 'Dish',
      image:'',
      duration:10,
      creator: 'Carlos Fabian',
      date: '29/01/2020'
    }
    
  Recipe.create(myRecipe).then(myRecipe => {console.log(myRecipe.title)
  .catch(err => console.log(err))

  Recipe.insertMany()


  
  })
    
    */

  )
  .catch(err => console.error('Error connecting to mongo', err));

  mongoose.connection.close()
  
  
