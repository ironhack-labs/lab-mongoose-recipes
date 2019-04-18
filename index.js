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

function addNewRecipe(title, level, ingredients, cuisine, dishType, duration, creator ){
  const newRec = new Recipe( { title: title, level: level, ingredients: ingredients, cuisine: cuisine, dishType: dishType, duration: duration, creator: creator} );
  newRec.save(function (err){
    if (err){
      console.log(err);
    } else{
      console.log(`Recipe ${title} criado com sucesso!`);
    }
  });
}

//addNewRecipe('bolo','Easy Peasy', 'ovo', 'cuisine', 'Snack', 10, 'Kelly');

/*Recipe.insertMany(data, function(error, docs) {
    if(error){
      console.log(error);
    }else{
      console.log(`Recipe ${docs} criado com sucesso!`);
    }  
});*/


  Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: 100})
  .then((res) => {
    console.log('Registro alterado com sucesso', res)
  })
  .catch((err) => {
    console.log('Erro', err)
  });


  Recipe.deleteOne({ title: 'Carrot Cake' })
    .then((res) => {
      console.log('Registro deletado com sucesso', res)
    })
    .catch((err) => {
      console.log('Erro', err) 
    });


mongoose.connection.close(function () {
  console.log('Mongoose connection disconnected');
  });
