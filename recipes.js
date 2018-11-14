const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');



var recipeSchema = new mongoose.Schema({
  title : { 
    type : String , 
    required : true,
    unique : true
  },

  level :  {
    type : String ,
    enum : ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] 
  },

  ingredients : [],

  cuisine: {
    type : String ,
    required : true
  },

  dishType : {
    type: String ,
    enum : ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', "Other"]
  },
  
  image : {
    type : String ,
    default :  'https://images.media-allrecipes.com/images/75131.jpg'
  },
  
  duration : {
    type : Number ,
    minlength : 0 
  },
  
  creator : String ,
  created : {
    type : Date ,
    default : Date.now 
  }


})
var Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({
   title : 'Pizza', 
   level : 'Easy Peasy', 
   ingredients : ['bread' , 'cheese' , 'ham'],
   cuisine : 'Italian',
   dishType: 'Dish' ,
   image : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
   duration : 20 ,
   creator: 'Eduardo Ravioli ',
   created: 11/14/2018,

  },
   function (err, Recipe) {
  if (err) {
      console.log('Error has occured ... This is the Error : ', err);
  } else {
      console.log('You just saved a new Recipe to the database .... ', Recipe);
  }
});


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  

module.exports = Recipe;