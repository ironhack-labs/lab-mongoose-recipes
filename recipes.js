const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');


mongoose.connect('mongodb://localhost/recipeApp')
.then(() => {
  console.log('Connected to Mongo!');
}).catch(err => {
  console.error('Error connecting to mongo', err);
});


const recipe = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: [],
  cuisine: {type: String, required: true},
  dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date()}
});

const Recipe = mongoose.model("Recipes", recipe);

// Recipe.create({
//   title: "Mondongo",
//   level: "Easy Peasy",
//   ingredients: ["1 pound beef tripe (mondongo), cut into small pieces", "Juice of 1 lime", "1/4 teaspoon baking soda", "1 1/2 pounds pork meat, cut into small pieces", "3 Colombian chorizos, sliced (optional)", "1 tomato, chopped",
//   "2 scallions, chopped", "1/4 cup white onion, chopped", "4 small potatoes, diced", "1 pound yuca, diced", "Salt and pepper", "1/2 teaspoon ground cumin", "1/4 teaspoon achiote", "1/3 cup fresh cilantro", 
//   "1 garlic clove, chopped", "water"],
//   cuisine: "Colombian",
//   dishType: "Dish",
//   image: "https://www.mycolombianrecipes.com/wp-content/uploads/2010/05/Mondongo-con-aguacate.jpg",
//   duration: 180,
//   creator: "Oscar"
// })
// .then((x)=>{
//   console.log(x);
// })
// .catch((y)=>{
//   console.log(y)
// })

  // Recipe.insertMany(data)
  //   .then((x)=>{
  //     console.log(x.title)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   });

  // Recipe.updateOne({title:"Rigatoni alla Genovese"}, {duration: 100})
  //   .then(()=>{
  //     console.log("Succes!")
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })

  Recipe.deleteOne({title: "Carrot Cake"})
    .then(()=>{
      console.log("Succes!")
    })
    .catch((err)=>{
      console.log(err)
    })