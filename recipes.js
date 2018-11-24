const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  const RecipeSchema = new Schema({
    title : {type: String, unique: true},
    level: String,
    ingredients  : Array,
    cuisine : String,
    dishType: String,
    image : { type : String , default:"https://images.media-allrecipes.com/images/75131.jpg"},
    duration : { type : Number , min:0},
    creator : String,
    created : { type : Date , default: Date.now },
  });


  const Recipe = mongoose.model('Recipe', RecipeSchema);
  module.exports = Recipe;
  
  Recipe.create({ title : "Salade de pâtes", level : "5" , ingredients : [1,4,5] , cuisine : "française" ,
    dishType : "breakfast", duration : "15"})
    .then( RecipePate => { console.log('The user is saved and its value is: ',RecipePate.title) })
    //.catch(err => { console.log('An error happended: ', err)})

  
  Recipe.insertMany(data)
    .then( Recips => {console.log('The user is saved and its value is: ', Recips)} )


  Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(successCallback)
  .catch(errorCallback);




    

