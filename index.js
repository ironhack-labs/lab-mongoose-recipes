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

setTimeout(function(){ 
  Recipe.insertMany(data, { useNewUrlParser: true })
      .then(title => { 
    
        data.forEach(element =>{
          console.log("We add " + element.title)
        })
    
      }).catch(err => { 
        console.log('Error:', err); 
}); }, 2000);

setTimeout(function(){  
  Recipe.updateOne({title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then(title => { 
    
      console.log("We updated the duration" )
     
    }).catch(err => { 
      console.log('Error:', err); 
}); }, 3000);

setTimeout(function(){ 
  Recipe.deleteOne({ title: "Carrot Cake" }, function (err) {});
  console.log("We delete the Carrot Cake recipe")
}, 5000);


