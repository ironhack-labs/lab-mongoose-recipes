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


// ITERATION 2
// Recipe.create({
//   title: "Cevice",
//   level: "UltraPro Chef",
//   ingredients: ["Fish", "Ginger", "Lime", "Aji Limo"],
//   cuisine: "Peruvian",
//   dishType: "Dish",
//   duration: "20",
//   creator: "Fabricio",
// })
//   .then(cev => console.log(`this ${cev} is fire!!!`))
//   .catch(err => console.log(err))


// const Recipe = mongoose.model("Recipe", Recipe)


// ITERATION 3:
// Recipe.insertMany(data)

// ITERATION 4:

async function update(name) {
  const result = await Recipe.updateOne({ title: name }, {
    $set: {
      duration: 100
    }
  })
  console.log(`succesfully updated ${result}`)
}


// update("Rigatoni alla Genovese")

// ITEREATION 5

async function deleteItem(name) {
  const result = await Recipe.deleteOne({ title: name })
  console.log(`removed ${result}`)
}

// deleteItem("Carrot Cake")

mongoose.connection.on('disconnected', function () {
  console.log("Mongoose default connection is disconnected");
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log("Mongoose default connection is disconnected due to application termination");
    process.exit(0);
  });
});