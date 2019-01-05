const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
/*mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });*/

const recipe = new Schema({
  title         : String,
  level         : String,
  ingredientes  : Array,
  cusine        : String,
  dishType      : String,
  image         : String,
  duration      : Number,
  creator       : String
}, {
    timestamps: {
      createdAt: "created",
    }
  });


const Recipe = mongoose.model("Recipe", recipe);

module.exports = Recipe;

//Create a recipe
let objectRecipe = {
  title: 'Pozole',
  level: 'Super fucking good chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Asian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
}

Recipe.create(objectRecipe, (err) => {
  if (err) { throw (err) }
  console.log(objectRecipe.title)
});

//Insert Many recipes
Recipe.insertMany(data,(err) => {
  if (err) { throw (err) }
  data.forEach(e => {
    console.log(e.title)   
  })
})

//Update recipe
Recipe.update({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { multi: true }, (err, raw) => {
  if (err) { throw (err) }
  console.log("se actualizo", raw)
})

//Remove a recipe
Recipe.remove({ title: "Carrot Cake"},(err) => {
  if (err) { throw (err) }
  console.log("success");
  //Close the Database
  mongoose.connection.close()
})