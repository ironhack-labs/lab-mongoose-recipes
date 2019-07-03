const mongoose = require('mongoose');
const RecipeObj = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  ///////////////////////////////////////////////
  /*//Iteration 2 - Create a recipe 
  RecipeObj.create(data[0])
  .then(()=>{
    console.log('dot create worked');
    console.log(data[0].title);
  })
  .catch((err)=>{
    console.log('dot created didnt work',err)
  })
  */

  ///////////////////////////////////////////////
   /*//Iteration 3 - Insert Many recipes
   RecipeObj.insertMany(data)
  .then((msg)=>{
    msg.forEach((element)=>{
      console.log(element.title);

    })
    console.log('dot create worked');
    // console.log(data[index].title);
  })
  .catch((err)=>{
    console.log('dot insert didnt work',err)
  })
  */

  ///////////////////////////////////////////////
  /*//Iteration 4 - Update recipe
    RecipeObj.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
    .then(()=>{
        console.log("Update Succesfull");
    })
    .catch((err)=>{
      console.log('dot update didnt work',err)
    })
   */

///////////////////////////////////////////////
/*//Iteration 5 - Remove a recipe
RecipeObj.deleteOne({title: 'Carrot Cake'})
    .then((msg)=>{
        console.log("Delete Succesfull");
    })
    .catch((err)=>{
      console.log('dot delete didnt work',err)
    })
  */

  
