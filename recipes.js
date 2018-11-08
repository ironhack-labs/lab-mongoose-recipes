const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');



mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  


  // My recipe schema

  const recipeSchema = new Schema ({
    title : {
        type : String,
        required: true,
    },
    level : {
        type : String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
    },
    ingredients : {
        type : Array,
    },
    cuisine: {
      type: String,
      required: true,
    },
    dishType : {
      type : String,
      enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
    },
  
    image: {
      type : String,
      default : "https://images.media-allrecipes.com/images/75131.jpg."
    },
    duration: {
      type : Number,
      min: 0,
    },
    creator: String,
    created: {
      type: Date,
      default: Date.now(),}
});


// CREATION OF THE RECIPES 

// Creating the variable Recipe
const Recipe = mongoose.model("Recipe", {title: String, cuisine: String})



Recipe.create({title: "Burger", cuisine: "American"})
    .then((recipeDoc) => {
     console.log("RECIPE CREATION WORKED!! 😎", recipeDoc)
    })
     .catch((err) => {
        console.log("RECIPE CREATION failed 😅 ", err)
    });


    // iteration 3

    Recipe.insertMany(data)
    .then((recipeDoc) => {
      console.log("RECIPE INSERTION WORKED!! 😎", recipeDoc)
     })
      .catch((err) => {
         console.log("RECIPE INSERTION failed 😅 ", err)
     });



     // Iteration 4

     Recipe.findByIdAndUpdate(
      "5be468beac72ede8d9889cfc",
      {$set: {duration: 100}}
  )
  .then(recipeDoc =>{
      console.log (`RECIPE UPDATED -> ${recipeDoc.title} (id:  ${recipeDoc.id})`);
  })
  .catch(err => {
      console.log("Recipe NOT updated --- FAILURE", err);
  })



  // Iteration 5

  Recipe.findByIdAndRemove(`5be469e99de5abe8f28c17ea`)
  .then(recipeDoc =>{
      console.log (`DELETED -> ${recipeDoc.title} (id: ${recipeDoc.id})`)
  })
  .catch(err => {
      console.log("Recipe.findByIdAndRemove() FAILURE!!!!!",err) 
  });