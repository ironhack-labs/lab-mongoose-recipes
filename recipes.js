const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')


mongoose.connect('mongodb://localhost/recipeApp')
.then(() => {
  console.log('Connected to Mongo!')
}).catch(err => {
  console.error('Error connecting to mongo', err)
});


const RecipeSchema = new Schema({
  title : { type: String, required: true, unique: true},
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: Array },
  cousine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now() }
});


const Recipe = mongoose.model('Recipe', RecipeSchema);


Recipe.create({title: 'pizza', cousine: 'Italian', duration: 10})
.then((recipe) => { console.log('The recipe is saved and its value is: ', recipe) })
.catch((err) => { console.log('An error happened:', err) });


Recipe.insertMany(data)
.then((recipe) => { recipe.forEach(function(e) {
  console.log(e.title);
});
})
.catch((err) => { console.log('An error happened:', err) });


setTimeout(function(){ 
  Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then((recipe) => { console.log('The duration is updated') })
  .catch((err) => { console.log('An error happened:', err) });
}, 2000);


setTimeout(function(){ 
  Recipe.deleteOne({title: 'Carrot Cake'})
  .then((recipe) => { console.log('The Carrot Cake is no longer') })
  .catch((err) => { console.log('An error happened:', err) });
}, 4000);


setTimeout(function(){ mongoose.disconnect() }, 6000);

