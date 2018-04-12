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
  title: {type: String},
  level:{type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients:{type: Array},
  cousine:{type: String, required: true},
  dishType:{type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image:{type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration:{type: Number, min:0},
  creator:{type: String},
  created:{type: Date, default: Date.now}
})

const Recipe =mongoose.model("Recipe", recipeSchema);

const eliseRecipe = new Recipe({title: "Elise Frites", cousine: "FAT" });
eliseRecipe.save()
.then(()=> {
  console.log(eliseRecipe.title + "🍟");
})
.catch((err) => {
console.log("TITLE is not Created 😒 WTF ", err);
});

const arr = new Recipe();

Recipe.insertMany(data)
.then((data)=> {
  data.forEach((one) => {
    console.log(one.title)
  });
})
  .catch((err)=>{
    console.log("WWWTTTFFF", err);
});

Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100})
.then(()=>{
  console.log("Elise is jumping from the window!!");
})
.catch((err)=>{
  console.log("WWWTTTFFF", err);
});

Recipe.findOneAndRemove({title: "Carrot Cake"})
  .then(()=>{
  console.log("Elise is coming back from outside!!");
})
  .catch((err)=>{
  console.log("WWWTTTFFF", err);
});

// brew services stop mongodb
