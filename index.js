const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

/******MONGOOSE CRUD*******/

Recipe.create(
  {
    title : "Cocido" ,
    level: "UltraPro Chef",
    ingredients  :["garbanzos", "patata", "zanahoria","carne","chorizo"],
    cuisine : "Spanish",
    dishType : 'Dish',
    duration : 600,
    creator : "Madre de Sandra Lerma"
  },  
  function (err, recipe) {
    if (err) {
        console.log('An error happened:', err);
    } 
    else 
    {
      console.log('The recipe is saved and its value is: ', recipe);
      
      Recipe.findOne({title: 'Cocido'}, function(err,obj) {
          
        if(err){

            console.log(err);
          }
          else
          {
            console.log(obj.title); 
          }   
      });
    }
  }
);

Recipe.insertMany(data, function(error, docs) {
    if(error){
    console.log(error);
    }
    else
    {
      for(let doc of docs){
        console.log(doc.title);
      }

      Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { $set:{duration: 100}})
      .then( modifiedDoc => {
        
        console.log('MOD ',modifiedDoc); 
        
        Recipe.deleteOne({ title: "Carrot Cake"})
        .then( deleteDoc => {
                console.log('DELETED',deleteDoc); 
                
                mongoose.connection.close(() => { 
                  console.log('Mongoose default connection disconnected through app termination'); 
                  process.exit(0); 
                }); 
        })
        .catch( err => {console.log('ERR '+err);});
      })
      .catch( err => {console.log('ERR '+err);});
        
    }
  });

  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', () => {  
    mongoose.connection.close(() => { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 