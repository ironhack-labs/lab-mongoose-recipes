const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

const recipeSchema = new Schema ({
  title: { type: String, required: true, unique: true},
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: [] },
  cuisine: { type: String },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg ' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: 22/06/2018}
});

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create ({
  title: 'Shrimp Pasta Salad',
  level: 'Amateur Chef',
  ingredients: ['Greek yogurt', 'Chicken broth', 'Lemon juice', 'Mustard', 'Garlic', 'Pepper', 'Pasta', 'Schrimp', 'Olive oil', 'Green Onions', 'Cheddar cheese'],
  cuisine: 'Salad',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/3831941.jpg',
  duration: 40,
  creator: 'Jihad'
})
  .then((recipeDoc) => {
    console.log("Shrimp Pasta Salad'", recipeDoc);
  })
  .catch((err) => {
    console.log('Recipe created FAILURE', err);
  });

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to Mongo', err)
  });

Recipe.insertMany(data)
  .then((oneRecipe) => {
    console.log(` ${oneRecipe.title}`)
  })
  .catch((err) => {
    console.log('Insert recipe FAILURE', err);
  });


Recipe.updateOne(
  { title: 'Rigatoni alla Genovese', duration: 220},
  { duration: 100}
)
.then((recipeDoc) => {
  console.log("Rigatoni UPDATES", result)
})
.catch((err) => {
  console.log("Rigatoni UPDATES FAILED!", err)
});


Recipe.deleteOne({ _id: "5b2cd8caba40461b84aca5f2"})
  .then((result) => {
    console.log("Delete SUCCESS!", result);
  })
  .catch((err) => {
    console.log("Delete ERROR!", err);
  });

mongoose.close('mongodb://localhost/recipeApp')
   .then(() => {
    console.log('Disconnected to Mongo!')
  }).catch(err => {
    console.error('Error disconnecting to Mongo', err)
  });