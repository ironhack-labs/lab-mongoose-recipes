const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const recipeSchema = new Schema({
  title: {type:String, unique:true, required:true},
  level: {type:String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: Array,
  cuisine:{type:String, required:true},
  dishType: {type:String, enum:['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image: {type:String, default:"https://images.media-allrecipes.com/images/75131.jpg"},
  duration:{type:Number, min:0},
  creator: String,
  created: {type:Date, default: Date.now}
})

const Recipe = mongoose.model("Recipe", recipeSchema);

function newRecipe(){
  return Recipe.create({
    title:"Croquetas Congeladas",
    level:"UltraPro Chef",
    ingredients: ["1 box frozen croquettes"],
    cuisine: "Spanish",
    dishType: "Snack",
    image: "https://www.lacocinera.es/-/media/lacocinera/500x350/aperitivos/croquetas-artesanas-cocido.ashx?mw=500&as=0&hash=CA45D76316BA7D74802F78EEB8FDA68578036ED8",
    duration: 3,
    creator: "La Cocinera"
  })
}
function doRecipe(){
  return Recipe.insertMany(data)
}
function doChanges(){
  return Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:100})
}
function doRemove(){
  return Recipe.deleteOne({title:"Carrot Cake"})
}
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    newRecipe()
    .then(data => {
      console.log(data.title);
      doRecipe()
      .then(data => {
        console.log("Success")
        doChanges()
        .then(data =>{
          console.log("success message!")
          doRemove()
          .then(data => {
            console.log("success message!")
            mongoose.connection.close();
          })
          .catch(err => {console.log(err)})
        })
        .catch(err => {console.log(err)})
      })
      .catch(err => {console.log(err)})
    })
    .catch(err => {console.log(err)})
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
