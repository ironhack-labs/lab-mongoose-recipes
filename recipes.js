const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  // Set up the schema
const recipeSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    unique: true 
  }, 
  level: {
    type: String, 
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef", ]
  },
  ingredients: [String],
  cuisine: {
    type: String, 
    required: true
  },
  dishType: {
    type: String, 
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String, 
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number, 
    min: 0
  }, 
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: Date(),
  },
});

  // Create new class
const Recipe = mongoose.model("Recipe", recipeSchema);

// Create new recipe document and send it to db
Recipe.create({ title: "Galettes", level: "Easy Peasy", ingredients: ["Water", "Flour", "Egg", "Salt"], cuisine: "French", duration: 30 })
  .then(recipeDoc => {
    console.log(`New recipe added (title: ${recipeDoc.title})`);
  })
  .catch(err => {
    console.log("error reported", err);
  });

// InsertMany

Recipe.insertMany(data, function(error, docs) {
  docs.forEach(oneRecipeDoc => {
    console.log(`${oneRecipeDoc.title} added`);
  });
  if (error === true) {
    console.log("adding recipes database failed", error);
  } 
});


// Update duration of 1 recipe
Recipe.findByIdAndUpdate(
  "5be46627728d387f3891417e", 
  {$set: { duration: 100 } }
  ) 
  .then(recipeDoc => {
    console.log(`The following recipe has been updated: ${recipeDoc.title}.`);
  })
  .catch(err => {
    console.log("Sorry, the recipe couldn't be updated", err);
  });

  
  // Removing a recipe
  Recipe.findByIdAndRemove("5be46627728d387f3891417d")
  .then(recipeDoc => {
    console.log(`The following recipe has been deleted: ${recipeDoc.title}.`);
  })
  .catch(err => {
    console.log("Sorry the recipe was not deleted", err);
  });
 