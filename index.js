const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });


//ITERATION 2
// Recipe.create({
//   title: 'Chicken Curry',
//   level: 'Amateur Chef',
//   ingredients: ['1/2 cup rice', '5 tablespoons curry', '3 onions', '1 piece of bamboo', '3 peppers', '1/2 can of cocomilk'],
//   cuisine: 'Asian',
//   dishType: 'Dish',
//   image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
//   duration: 10,
//   creator: 'Chef Floriano'
// })
//   .then(document => {
//     // this callback function fires when the Promise was fulfilled (successfully)
//     console.log("I CREATED A RECIPE");
//   })
//   .catch(err => {
//     // this callback function fires when the Promise was rejected
//   });

//ITERATION 3
Recipe.insertMany(data);
for (let i = 0; i < data.length; i++) {
  console.log(data[i].title);
}
//ITERATION 4
Recipe.updateOne(
  {duration: 220},
  {duration: 100}
)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });


//ITERATION 5
Recipe.deleteOne( {title: "Carrot Cake" } ).then(response => {
  console.log("Successfully deleted");
})
.catch(err => {
  console.log(err);
})

// mongoose.connection.close();
