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

/* ------------------------------------------------------------- ITERATION 2 ------------------------------------------------------------ */
Recipe.create({
  title: 'Eggs Benny',
  level: 'Easy Peasy',
  ingredients: ["Eggs", "toast", "hollandaise sauce", "spinach"],
  cuisine: 'Western',
  dishType: 'Breakfast',
  duration: 10,
  creator: "Patrick",
})
  .then(resp => {
    console.log(resp);
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


/* ------------------------------------------------------------- ITERATION 3 ------------------------------------------------------------ */
Recipe.insertMany(data)
  .then(respArray => {
    respArray.forEach((obj) => {
      console.log(obj.title)
    })
  })
  .catch(err => {
    console.log(err)
  })

/* ------------------------------------------------------------- ITERATION 4 ------------------------------------------------------------ */

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 }
)
  .then(resp => {
    console.log("The following has been successfully updated!", resp)
  })
  .catch(err => {
    console.log(err)
  })


/* ------------------------------------------------------------- ITERATION 5 ------------------------------------------------------------ */

Recipe.findOneAndDelete(
  { title: "Carrot Cake" }
)
  .then(resp => {
    console.log("The following has been successfully deleted!", resp)
  })
  .catch(err => {
    console.log(err)
  })


/* ------------------------------------------------------------- ITERATION 6 ------------------------------------------------------------ */

// Aware that to make every model function occur in sequential order, we must nest each function in the previous one's .this condition.
mongoose.connection.close()