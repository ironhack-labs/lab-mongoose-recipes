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
  title : { type: String, required: true, unique: true },
  level : { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients : { type: [] },
  cousine : { type: String },
  dishType : { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Others' ] },
  image : { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration : { type : Number, min: 0 },
  creator : { type: String },
  create : { type: Date } 
});

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({   
  title : 'Paella', 
  level : 'Amateur Chef', 
  ingredients : ['Rice', 'Seafood', 'Soup'], 
  cousine : 'Spanish', 
  dishType : 'Dish', 
  duration : 60, 
  creator : 'Gabitse', 
  create : '2018-07-05'})
  .then((recipeDish) => { console.log('The title of the recipe is: ' + recipeDish.title) })
  .catch((err) => { console.log(err) });



// Recipe.insertMany(data)
//   .then((data) => { 

//     data.forEach(function(item){
//       console.log('The title of the recipe is: ' + item.title) 
//     })
    

//   })
//   .catch((err) => { console.log(err) });


Recipe.insertMany(data)
  .then((data) => {
  data.forEach( function (item) {
    console.log('The title of the recipe is: ' + item) })
    return Recipe.updateOne( { title: 'Rigatoni alla Genovese' }, { duration: 100 } )
 })
 .then(data => {
   //missing data
 })
.catch((err) => { console.log(err) });

//-------iteration 4-------//


//-------iteration 5-------//
Recipe.deleteOne( {title: 'Carrot Cake' } )