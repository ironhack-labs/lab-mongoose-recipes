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
  title: String,
  level: String,
  ingredients: [String],
  cousine: { type: String, required: true},
  dishType:{ type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
})

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({
  title: 'Burger Cangreburger',
  cousine: 'Hamburgers'
}).then((recipe)=>{
  console.log(recipe.title);
}).catch((err)=>{
  console.log(err);
});

Recipe.insertMany(data, (err,data)=>{
  (err)?console.log(err):data.forEach((recipe,i)=>{
    console.log(recipe.title)
    if(recipe.title == "Rigatoni alla Genovese"){
      Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
      .then(()=>console.log('Rigatonni updated'))
      .catch(err=>console.log(err));
    }
  });
})