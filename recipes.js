const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const datos = [...data]

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


const recipeSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: {
    type: Array
  },
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },

})

const Recipe = mongoose.model('Recipe', recipeSchema);

// const recipe = {
//   title:"Canelones",
//   level:"Easy Peasy",
//   ingredients:["Atún","Tomate","Bechamel"],
//   cuisine :"Italian",
//   dishTypedishType:"Dish",
//   image: "",
//   duration:40,
//   creator:"Juan",
//   created: Date("2019-04-04")
  
// }
//   Recipe.create(recipe)
//   .then(theRecipe=> {console.log("canelones")})
//   .catch(err=>{console.log(err)})
// console.log(datos)  

Recipe.insertMany(datos)
.then((data)=>{console.log(data)})
.catch(err=>{console.log(err)})

Recipe.findOneAndUpdate({ title:'Rigatoni alla Genovese'}, { duration: 100 })
.then((success)=>{console.log(success)})
.catch(err=>{console.log(err)})


Recipe.findOneAndDelete({ title: 'Carrot Cake'})
.then(()=>{
  // console.log(success);
  mongoose.disconnect().then(()=>{
    console.log("Disconnected")
  })
})
.catch(err=>{console.log(err)})





