// the next three lines ara to link the files so we can use the information from them
const mongoose = require('mongoose');

const Recipes = require('./Recipes');

const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


// Recipe.create({title: "tortilla de mango", level:"Easy Peasy", ingredients:"arroz, mango, jalapeno", cuisine:"Street Food", dishType:"Dish", duration: 25, creator:"the Cuban People",  })
//   .then((theRecipeObject)=>{
//     console.log(theRecipeObject);
//   })
//   .catch((err)=>{
//   console.log(err);
//   })


  // Recipes.insertMany(data)
  // .then((theRecipeObject)=>{
  //   console.log(theRecipeObject);
  //   console.log("===============================");
  //   console.log("Success");
  // })
  // .catch((err)=>{
  // console.log(err);
  // })

  // Recipes.updateOne({title:"Rigatoni alla Genovese"}, {duration:100})
  // .then((theRecipeObject)=>{
  //     console.log(theRecipeObject);
  //     console.log("Success");
  //   })
  //   .catch((err)=>{
  //   console.log(err);
  //   })

  Recipes.findByIdAndRemove("5beb312aadbe621444597a2d")
  .then((theRecipeObject)=>{
        console.log(theRecipeObject);
        console.log("Success");
      })
      .catch((err)=>{
      console.log(err);
      })