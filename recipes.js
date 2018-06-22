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
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy','Amateur Chef', 'UltraPro Chef']},
  ingredients: {type: Array},
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
}) 

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({
  title: 'Pizza',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', 'mushroom', 'peperoni'],
  cousine: 'Italian',
  dishType: ['Dish'],
  image: 'https://image.afcdn.com/recipe/20170105/24149_w420h344c1cx2592cy1728.jpg',
  duration: 150,
  creator: 'Chef Marie'
})
.then((recipeDoc)=>{
  console.log("First recipe creation success!", recipeDoc)
})
.catch((err)=>{
  console.log("First recipe creation failure!", err);
});


Recipe.create(data)
  .then((recipeDoc)=>{
    console.log("Recipe creation success!", recipeDoc)
  })
  .catch((err)=>{
    console.log("Recipe creation failure!", err);
  });

Recipe.find()
  .then((recipeResults)=>{
    recipeResults.forEach((oneRecipe) => {
      console.log(oneRecipe.title);
    });
  })
  .catch((err)=>{
    console.log("find recipes failure!", err)
  });

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then((result)=>{
    console.log('Recipe update success', result)
  })
  .catch((err)=>{
    console.log('Recipe update failure!', err)
  });

  Recipe.remove({title: 'Carrot Cake'})
  .then((result)=>{
    console.log('Recipe delete success', result)
  })
  .catch((err)=>{
    console.log('Recipe delete failure!', err)
  });
