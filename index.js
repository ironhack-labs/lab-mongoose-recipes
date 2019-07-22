const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/kitchen', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

 // Iteration 2 (Recipe create) //

 Recipe.find({})
    .then((recipes)=> {
      console.log(recipes[0].title);
      })
    .catch((err)=> {
      console.log(err)
    })
    
    // Iteration 3 (insertmany- title of each recipe)
Recipe.find({})
    .then((recipes)=> {
      for(var i = 0; i < recipes.length; i++){
        console.log(recipes[i].title)}
      })
    .catch((err)=> {
      console.log(err)
    })

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {durattion: 100})
    .then(()=> {console.log("successfully updated")
      })
    .catch((err)=> {
      console.log(err)
    })   
  
Recipe.deleteOne({title: 'Carrot Cake'})
    .then(()=> {console.log("success")
      })
    .catch((err)=> {
      console.log(err)
    })      

// mongoose.connection.close()
//     .then(res => {console.log("success!")
//     })
//     .catch((err)=> {
//     console.log(err)
//     }) 
    
    
    

