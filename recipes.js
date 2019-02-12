const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const recipeSchema = new Schema({
    title: {type: String, required: true, unique: true},
    level: {type: String, enum:['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: Array,
    cuisine: {type:String, required:true},
    dishType: {type:String, enum:['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: {type:String, default:' https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type:Number, min:0 },
    creator: String,
    created: {type:Date, default: Date.now }
  });

  const Recipe = mongoose.model('Recipe', recipeSchema);
  module.exports = Recipe;

    Recipe.insertMany(data)
    .then(recipes=> {
      for (recipe of recipes){
        console.log(recipe.title)
      }
      //UPDATE RIGATONI
      Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100}, (err, res) => {
        console.log("Recipe successfully updated");
      });
      //REMOVE CARROT CAKE
      Recipe.deleteOne({title: "Carrot Cake"}, (err,res)=>{
        console.log("carrot cake removed");
      });

      // mongoose.connection.close((err, res)=>{
      //   console.log("connection closed");
      // })
  
    });

    setTimeout(() => {
      mongoose.connection.close();
      console.log("connection closed");
    }, 5000);

    

    
    
  
   



