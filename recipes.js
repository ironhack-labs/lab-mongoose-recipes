const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
    insertMany()
    .then((recipes) => {
      console.log(recipes)
    })
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipeSchema = new Schema({
    title: {type: String, required: true, unique:true},
    level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: [],
    cousine: {type: String, required: true},
    dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Other' ]},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min: 0},
    creator: {type: String},
    created: {type: Date, default: Date.now}
  })

const recipe = mongoose.model ('recipe', recipeSchema);

  recipe.create({
    title: 'chimichurri', 
    level: 'Easy Peasy', 
    ingredients: ['parsley', 'red onion', 'garlic', 'olive oil', 'red wine vinegear', 'salt to taste'], 
    cousine: 'Argentinian', 
    dishType: 'Other', 
    duration: 15, 
    creator: 'unknown'})
  .then((title)=>{
    console.log(title);
  })
  .catch((err)=>{
    console.log(err)
  });

  insertMany = () => {
    return recipe.insertMany(data);
  };


  console.log(data[0].title)


  



  // res.render('',{title});