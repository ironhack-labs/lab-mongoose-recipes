const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipeSchema = new Schema({
    title : { type: String, required: true, unique: true },
    level : { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
    ingredients : { type: Array },
    cousine : { type: String, required: true },
    dishType : { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
    image : { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration : { type: Number, min: 0 },
    creator : { type: String },
    created : { type: Date, default: Date.now },
  });

const Recipe = mongoose.model('Recipe', recipeSchema);

var newRecipe = new Recipe ({
  title  :"Pizza",
  // level :  ,
  ingredients : ['bread','Tomato'],
  cousine : "lala",
  dishType :  'Other',
  // image :,
  duration :  10,
  creator : 'MEME'
  // created: {type: Date, default: Date.now}
 })

Recipe.create(newRecipe)
  .then((newRecipe) => { console.log('The name of the recipe is:', newRecipe.title) })
  .catch((err) => { console.log('An error happened:', err) });

Recipe.insertMany(data, function(err, titles) {
  console.log(data.title);
});



Recipe.deleteOne({ title: 'Carrot Cake' }, function (err) {});