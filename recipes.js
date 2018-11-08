const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


const recipeSchema = new Schema ({
  title: {
    type: String,
    required: true, 
    unique: true
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: {type: Array},
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: [ "Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {type: String},
  created: {
    type: Date,
    default: Date.now
  }
})


const Recipe = mongoose.model("recipe", recipeSchema);

// --- C ---

// Recipe.create({
//   title: "Pizza", 
//   level: "Easy Peasy", 
//   ingredients: ["tomato", "olive", "mozzarella"],
//   cuisine: "americano-italiano",
//   dishType: "Snack",
//   duration: 20,
//   creator: "dimé"
// })

//   .then(recipeDoc => {
//     console.log("Create works", recipeDoc);
//   })
//   .catch(err => {
//     console.log("Create doesn't work", err);
//   });



Recipe.insertMany(data)

  .then(recipeDoc => {
    recipeDoc.forEach ( oneRecipe => {
      console.log(oneRecipe.title);
    })
  })
  .catch(err => {
    console.log("insertMany doesn't work", err);
  });


  // --- R --- 

  // --- U --- 
Recipe.updateMany( 
  {title: {$eq: "Rigatoni alla Genovese"}}, 
  {$set: {duration: 100}}
)
  .then(result => {
    console.log("updating succeed", result);
  })
  .catch(err => {
    console.log("update failed", err);
  });



  // --- D --- 
  Recipe.deleteMany(
    {title: {$eq: "Carrot Cake"}}
  )
    .then(recipeDoc => {
      console.log("carot cake suppr", recipeDoc);
    })
    .catch(err => {
      console.log("Suppr doesn't work", err);
    });
