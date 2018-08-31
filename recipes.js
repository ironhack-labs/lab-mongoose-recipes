const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: [ String ],
  cousine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({title: "Apple Pie", ingredients: "Apples", cousine: "American"})
    .then( recipeDoc => {
      console.log(`recipe ${recipeDoc.title} ok!`, recipeDoc);
    })
    .catch( err => {
      console.log("Error! 😤", err);
    });

Recipe.insertMany(data)
    .then( recipeDoc => {
      data.forEach (oneRecipe => {
        console.log(`recipe ${oneRecipe.title} ok!`, recipeDoc);
      });
    })
    .catch( err => {
      data.forEach (oneRecipe => {
        console.log(`recipe ${oneRecipe.title} err!`, err);
    });
  });

Recipe.findByIdAndUpdate(
  "5b8937cb3363a2b2c811f539",
  { $set: {duration: 100} }
)
.then( recipeDoc => {
  console.log(`update ok!`, recipeDoc);
})
.catch( err => {
  console.log(`update error`, err);
});

Recipe.findByIdAndRemove("5b8937cb3363a2b2c811f538")
  .then( recipeDoc => {
      console.log(`DELETED recipe`, recipeDoc);
  })
  .catch( err => {
      console.log("FAILURE!! 😤", err);
  });