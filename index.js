const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

function successCallback() { console.log("successsful CRUD  ")};
function errorCallback(err) { console.log("error is: " + err)};

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    // iteration 2
     /*  // another way to add many
    data.forEach((recipex)=>{
      // console.log(recipex);
      Recipe.create(recipex )
            .then((recipex)=>{
              console.log("name: " + recipex.title);
            })
            .catch((err)=>{console.log("error  " + err);});

      console.log("========    ++++++   =======");

    }); 
    */

    // iteration 3
    // Recipe.insertMany(data); 
    // iteration 4
    /*
    Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
        .then(successCallback)
        .catch(errorCallback);
      */
     // iteration 5
     /*
     Recipe.deleteOne({ title: "Carrot Cake"})
            .then(successCallback)
            .catch(errorCallback);
   
      */
     // iteration 6
     /*
    setTimeout(function(){
      mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    }, 3000)
    */

  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

