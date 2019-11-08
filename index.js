const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

/* ------------------------------- iteration 2 ------------------------------ */

Recipe.create({
  title: "Spaghetti",
  level: "Easy Peasy",
  ingredients: ["spaghetti", "pesto", "salt"],
  cuisine: "Italian",
  dishType: "Dish",
  creator: "Daniel"
})

/* ------------------------------- iteration 3 ------------------------------ */

Recipe.insertMany(data)
  .then(resArray => {
    respArray.forEach((obj) => {
      console.log(obj.title)
    })
  }).catch(err => {
    console.log(err)
  })

/* ------------------------------- iteration 4 ------------------------------ */

Recipe.updateOne({
  title: "Rigatoni alla Genovese"
}, {
  duration: 100
}).then(res => {
  console.log("UDPATED")
}).catch(err => {
  console.log(err)
})

/* ------------------------------- iteration 5 ------------------------------ */

Recipe.deleteOne({
  title: "Carrot Cake"
}).then(res => {
  console.log("DELETED")
}).catch(err => {
  console.log(err)
})

/* ------------------------------- iteration 6 ------------------------------ */

// since the code is executed in an asynchronous way, the closing command would have to be nested within the other commands, so it is easier to just press CONTROL + C
//mongoose.connection.close()