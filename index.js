const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    //newRecepy();
    //newRecepy2();
    newRecepy4();
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

 function newRecepy(){
   Recipe.create({
     title:'asdsadasd',
      level:'asdsad',
       ingredients:[],
       cuisine:'asdsada',
       dishType:'asdsad',
       image:'asdasdas',
       duration:123,
       creator:'asdsad',
       created:Date.now,
   })
   .then((item) => {
     console.log(item.title)
   })
   .catch((err)=>{
     console.log(err)
   })
 }

function newRecepy2(){
  Recipe.insertMany(data)
  .then((data) => {
      for(item of data){
        console.log(data)
      }
  })
  .catch((err)=>{
    console.log(err)
  })
}

function newRecepy3(){
  //Rigatoni alla Genovese
  //duration = 100
  Recipe.findById('5d714f768202b487d33a0477')
    .then(item => {
      console.log('Found item!');
      // console.log(book)
      item.duration = 100;
      item.save()
        .then(() => {
          console.log('item was successfully saved.');
        })
        .catch(error => {
          console.log('item was not successfully saved.');
        });
      console.log('This piece of code is going to run synchronously');
    })
    .catch(error => {
      console.log('Got an error loading item.');
    });
}

function newRecepy4(){

  //Model.deleteOne
  Recipe.findById('5d714f768202b487d33a0476')
    .then(item => {
      console.log('Found item!');
      // console.log(book)
      item.remove()
        .then(() => {
          console.log('item was successfully deleted.');
        })
        .catch(error => {
          console.log('item was not successfully deleted.');
        });
      console.log('This piece of code is going to run synchronously');
    })
    .catch(error => {
      console.log('Got an error loading item.');
    });
}







