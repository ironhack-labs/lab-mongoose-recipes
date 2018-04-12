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
    title: { type: String, required: true, unique:true },
    level: { type: String, enum:["Easy Peasy","Amateur Chef", "UltraPro Chef"] },
    ingredients: { type: Array},
    cousine: { type: String, required: true},
    dishType: { type: String, enum:["Breakfast","Dish","Snack","Drink","Dessert","Other"] },
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min : 0},
    creator: {type: String},
    created : {type: Date, default: Date.now }
  });

  const Recipe = mongoose.model("Recipe", recipeSchema);

const iteration = 
  Recipe.create({title: 'Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cousine: 'Asian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'})
  .then(()=>{
    console.log("title :")})
  .catch((err)=>{
console.log("ERROR", err)
  })

const iteration2 = 
  Recipe.insertMany(data)
  .then((data)=>{
    data.forEach((Recipe) => {
      console.log("success" + Recipe.title)
    })
  .catch((err)=>{
    console.log("no success", err)
  })
  });
  const iteration3 = 
  Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then((data)=>{
    console.log("success")
  })
  .catch ((err)=>{
  console.log("no success", err)
});
const iteration4 = 
Recipe.deleteOne({title:'Carrot Cake'})
.then(()=>{
  console.log("success")
})
.catch ((err)=>{
console.log("no success", err)
});

Promise.all((iteration2,iteration3,iteration4)
.then(()=>{
  mongoose.connection.close()
  console.log("connection close")
})
.catch ((err)=>{
console.log("no success", err)
}));
