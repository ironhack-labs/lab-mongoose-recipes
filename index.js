const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'






const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



  // Iteration 2 - Create a recipe

  // Recipe.create({title: "Mcdoanlds", cuisine: "Fast Food", creator: "usa"}).then(createdRecipe => {
  //   console.log("new recipe mde  ", createdRecipe);
  //   }).then(()=> {
  //       console.log("yo it disconnected")
  //       mongoose.disconnect();
  //   }).catch(err => {
  //       console.log("yo it disconnected")
  //       mongoose.disconnect();
  //       throw err;
    
  //   })

  // Iteration 3 - Insert multiple recipes
  //   Recipe.insertMany(data)
  //   .then(()=> {
  //  Recipe.find({}, "title", (err, recipies) =>{
  //       if (err) {
  //         console.log(`Err occured getting recipies from db: ${err}`);
  //         return
  //     }
  //     console.log(`got titles`);
  //     recipies.forEach(recipie => console.log(`------> title: ${recipie.title}`))
      
  //     })



  //   })


  // .then(()=> {
    
    
  //       console.log("yo it disconnected")
  //       mongoose.disconnect();
  //   }).catch(err => {
  //       console.log("yo it disconnected")
  //       mongoose.disconnect();
  //       throw err;
    
  //   })



// Iteration 4 - Update recipe


// Recipe.findByIdAndUpdate(`631b8a716db7cb59ff6d10e3`, {duration: 100}, {new: true}).then(revisedItem => {//{new: true} is needed to see the updated data
//     console.log(revisedItem);
//     console.log("Success UPDATED!!!")

//     mongoose.disconnect();
// }).catch(err => {
//     mongoose.disconnect();
//     throw err;
// })


// Iteration 5 - Remove a recipe

// Recipe.findByIdAndRemove("631b8a716db7cb59ff6d10e2").then(() => {
//     console.log("You have deleted a the recipe carrot cake")
//     mongoose.disconnect();
// }).catch(err => {
//     mongoose.disconnect();
//     throw err;
// })



















      // db.recipe.find({}, {title: 1, _id: 0})

  // console.log(createdRecipes)



//   .then(createdRecipes => {

//     for (let i = 0; i < data.length; i++) {
      
//   console.log("title: ", createdRecipes[i].title);
// }





// DISCONNECT ORDER ISSUE IS REVISED BUT ONLY SHOWS THE ONES THAT WERE INPUTTED
      // .then(recipies => {

      //   recipies.forEach(recipie => console.log(`------> title: ${recipie.title}`))
      // })
  