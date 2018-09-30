const mongoose = require('mongoose');
//const Schema   = mongoose.Schema;
const data = require('./data.js')

const Recipe = require('./models/Recipe');


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
    closeDatabase();
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


function create(){
  Recipe.create({
    title: 'Huevo con Ejote',
    level: 'Amateur Chef',
    ingredients: ['4 Huevos', '1/2 taza de Ejote'],
    cuisine: 'Mexican',
    dishType: ['Breakfast'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 5,
    creator: 'Chef LeBotsy'
  })
  .then((huevos) =>{
      console.log(`${huevos} saved`);
  })
  .catch(err => {
      console.log(err);
  });
}

//create();

function insertData(data){
  Recipe.insertMany(data)
  .then((data) =>{
      console.log(`${data} saved`);
  })
  .catch(err => {
      console.log(err);
  });
}

//insertData(data);


function updateOneRecipe(title,data){
  Recipe.updateOne({title: title}, data)
      .then(res => {
          console.log(`${res} succesfully updated`)
          console.log(res);
      })
      .catch(err => {
          console.log(err);
      });
}

//updateOneRecipe('Rigatoni alla Genovese', {duration: 100});


function removeOneRecipe(title){
  Recipe.deleteOne({title: title})
      .then(res => {
          console.log(`${res} succesfully deleted`)
          console.log(res);
      })
      .catch(err => {
          console.log(err);
      });
}

//removeOneRecipe('Carrot Cake');

function closeDatabase(){
  //process.on('SIGINT', () => {  
    mongoose.connection.close(() => { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  //}); 
}