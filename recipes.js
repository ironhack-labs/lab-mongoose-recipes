const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


const RecipeSchema = new Schema ({ 
  title: {type: String}, 
  level: {type: String},
  ingredients: {
    type: Array
  },
  cuisine: {type: String},
  dishType: {type: String},
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
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

 });

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;

Recipe.create({ 
  title: 'tropiChop', 
  level: "easy", 
  ingredients: ["lettuce", "chicken", "corn", "rice", "beans"],
  cuisine: "Cuban",
  dishType: ["dish"],
  image: 'https://imageresizer.pollotropical.fuzzhq.com/resize/?source=https://koala-marketing-api-production.s3.amazonaws.com/pollo-tropical/assets/TropichopGrilledChickBlackBeansYellowRice.jpeg&height=9999&width=600&max_quality=85',
  duration: 5,
  creator: "Pollo Tropical"})
  .then(recipe => { console.log('The user is saved and its value is: ' + recipe) })
  .catch(err => { console.log('An error happened:', err) });



    // Recipe.insertMany(data)
    // for(recipes in data) {
    //   console.log(Recipe.title)
    // }


Recipe.insertMany(data)
  .then((recipes) => {
    for(recipe of recipes) {
      console.log(recipe.title);
    }
  })
  .catch((err) => {
    console.log("An error happened:" + err);
  });



Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}).then(result=> {
  console.log('Updated');
})


Recipe.remove({title: 'Carrot Cake'})
.then(result => {
  console.log('Removed');
}).catch((err) => {
  console.log('An error happened:' + err)
});