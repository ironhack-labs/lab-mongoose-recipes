const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema ( {
  title: { type: String, required: true, unique: true },
  level: { type: String, enum : ['Easy Peasy','Amateur Chef', 'UltraPro Chef'] },
  ingredients:  [ {type: String}],
  cuisine: { type: String },
  dishType: { type: String, enum : ['Breakfast','Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default:"https://images.media-allrecipes.com/images/75131.jpg" },
  duration: { type: Number, min: 0},
  creator: { type: String },
  created: { type: Date, default: Date.now() }
});


const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create( { title: "TEST RECIPE"})
  .then(() => {
    console.log('Schema & model Ok!')
  }).catch(err => {
    console.error('Error schema or model', err)
  });

Recipe.insertMany(data)
.then((recipeResults) => {
  recipeResults.forEach((oneRecipe) => {
    console.log(`${oneRecipe.title}`);
  });
})
.catch(err => {
  console.error('Error insertMany Failed', err)
});

Recipe.update( 
  { title: "Rigatoni alla Genovese" },
  {duration: 100}
)
.then(() => {
  console.log('Duration update Ok!')
}).catch(err => {
  console.error('Error updating duration', err)
});

Recipe.deleteOne( {_id: "5b2cd3801e708b2b800ce66a"})
.then ((result) => {
  console.log( "DELETE SUCCESS", result);
})
.catch ((err) => {
  console.log("DELETE FAILED", err);
});


