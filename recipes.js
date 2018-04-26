const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
  
  // create schema
  const recipeSchema = new Schema({
    title:    { type: String,required:true,unique:true },
    level:    { type: String, enum: ['Easy Peasy','Amateur Chef','UltraPro Chef'] },
    ingredients: { type: Array },
    cousine:  { type: String, required:true },
    dishType: { type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other'] },
    image:    { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration: { type: Number, min:0 },
    creator:  String,
    created:  { type: Date, default: Date.now },
  });

var Recipes = mongoose.model('Recipe', recipeSchema);

// insert one recipe
// var burrito2 = new Recipes ({ 
//   title: 'Burritos3', 
//   level: 'Easy Peasy', 
//   ingredients: ['Microwave','Frozen Burrito'],
//   cousine: 'American AF',
//   dishType: 'Dish',
//   image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/10/26/1/GI1806H_Stewed-Green-Chile-Chicken-Burrito_s4x3.jpg.rend.hgtvcom.616.462.suffix/1452637117909.jpeg',
//   duration: 2,
//   creator: 'Kat'
// });  
// burrito2.save(function (err) {
//   if (err) {console.log('An error happened:', err)}
//   else {console.log(burrito2)};
// });

// insert from data.js
// Recipes.insertMany(data)
// .then(()=> {
//   data.forEach(oneData => {

//     console.log("added recipes are: ",oneData.title)
//   })
// })
// .catch((error) => {
//   console.log("Error in adding data is: ", error)
// })

// Udpate Rigatoni alla Genovese duration
// Recipes.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
// .then((recipe) => {
//   console.log("Recipe updated: ", recipe)
// })


.catch(error =>{
  console.log(error)
})


Recipe.deleteOne({ title: 'Carrot Cake'})
.then((recipe) => {
  console.log("CARROT CAKE REMOVED", recipe)
})

.catch(error =>{
console.log(error)
})


// mongoose.connection.close()
