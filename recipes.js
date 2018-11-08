const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');



  //use mongoose Schema class to create our schema project
const recipeSchema = new Schema({
  title: {type:String,required:true},
  level :{type:String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
},
  ingredients:[String],
  cuisine:{type:String,required:true,},
  dishType:{type: String,
  enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
},
  image:{type:String, default: " https://images.media-allrecipes.com/images/75131.jpg"},
  duration:{type:Number,min:0,},
  creator:{type:String,},
  created:{ type: Date, default: Date.now }
 
});
const Recipe = mongoose.model("Recipe",recipeSchema);


//  Recipe.create({
//     title: 'Asian Glazed Chicken Thighgghhgffds',
//     level: 'Amateur Chef',
//     ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
//     cuisine: 'Asian',
//     dishType: ['Dish'],
//     image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
//     duration: 40,
//     creator: 'Chef LePapu',
//  })
//  .then ( recipeDoc =>{
//   console.log("RECIPE CREATE WORKED",recipeDoc);
//  })
//   //error of the operations
//   .catch (err =>{
//   console.log("'RECIPE CREATE FAILED",err);
//  });
 
 Recipe.insertMany(data)
 .then ( recipeDoc =>{
  console.log("RECIPE Insert WORKED",recipeDoc);
 })
  //error of the operations
  .catch (err =>{
  console.log("'RECIPE Insert FAILED",err);
 });

 mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  Recipe.findOneAndUpdate(
   { title: "Rigatoni alla Genovese "},
    {$set:{duration:100}}
)
.then(recipeDoc=>{
  console.log(`Recipe $set Worked`,recipeDoc );
})
.catch(err=>{
  console.log("Recipe $set Failure",err);
});
  
Recipe.findOneAndRemove(
  { title: " Carrot cake "},

)
.then(recipeDoc=>{
 console.log(`Recipe $remove Worked`,recipeDoc );
})
.catch(err=>{
 console.log("Recipe $remove Failure",err);
});
 

 


 











