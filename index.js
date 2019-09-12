const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'
var db = mongoose.connection.close

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  
Recipe.deleteMany({})
  .then(res => {console.log(res);
    mongoose.connection.close()
  })
  .catch(err => {console.error(err);
  })
  
  // Iteration 2
Recipe.insertMany(data)
  .then(a => {
    a.forEach(b => {
      console.log(b.title)
    })
    mongoose.connection.close()
  })
  .catch(err => {
    console.log("error inserting many +++++++++++>>>>> ", err);
  })


// Iteration 4
Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 } )
  .then(data => {
    console.log('Rigatoni alla Genovese duration has been changed to 100')
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })

// Iteration 5
Recipe.deleteOne({title: "Carrot Cake"})
.then(data => {
  console.log('Carrot Cake has been deleted')
  mongoose.connection.close()
})
.catch(err => {
  console.log(err)
})

let bananaPancakes = {
  title: 'bananaPancakes',
  ingredients: [
    'bananas',
    'pancakes'
  ]
}

let recipe = new Recipe(bananaPancakes)
recipe.save()