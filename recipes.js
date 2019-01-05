const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('../lab-mongoose-recipes/data');

const PlateSchema = new Schema ({
  title : String,
  level : String,
  ingredients : [],
  cuisine : String,
  dishType : [],
  image : String,
  duration : 0,
  creator : String,
  created : Date
})

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const Plate = mongoose.model("Plate", PlateSchema );

  const Yummy = new Plate ({
    title : 'Pasteles',
    level : 'Amateur Chef',
    ingredients : ['arina','vainilla','chocolate','huevo','leche'],
    cuisine : 'francesa',
    dishType : ['Dish'],
    image : '',
    duration : 120,
    creator : 'Chef Lion',
  });

const createRecipe = () => {
  Yummy.save()
    .then(()=>{
    console.log("Recipe Saved");
    })
    .catch(err=>console.log(err))
}

createRecipe();


 