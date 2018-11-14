const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');

    return Recipe.collection.drop()
  })
  .then(() =>{

    return Recipe.create(
      {title:"garbanzos", 
      level: "Easy Peasy", 
      ingredients: ["garbanzos","tomate","cebolla"], 
      cuisine:"Spanish",
      dishType: "Dish",
      image:null,
      duration: 39,
      creator:  "Chef Steven",
      created:null
    })
    .then(recipe => {console.log(recipe.tittle)})
    .catch(error => {console.log("An error happened: ",error)});

  }).then(()=>{
    return Recipe.insertMany(data)
    .then(recipe => {console.log(recipe.title)})
    .catch(error => {console.log("An error happened: ",error)});

  }).then(()=>{
    return Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration: 100})
    .then(recipe => {console.log("success update!!!")})
    .catch(error => {console.log("An error happened: ",error)});
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });


const recipeSchema = new Schema({
  title : {type: String, required : true, unique:true},
  level : {type:String, enum:["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients : {type: []},
  cuisine : {type: String},
  dishType : {type : String, enum:["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image : {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"  },
  duration : {type: Number, min: 0},
  creator : {type: String},
  created : {type: Date, default: Date.now}
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;



