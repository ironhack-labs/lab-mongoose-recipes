const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Receta = require("./models/schema");

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    Receta.collection.drop();
    console.log('Connected to Mongo!')
    Receta.insertMany(data, (error, docs)=>{
      if(error){
        console.log(error)
      } else {
        console.log(docs);
        Receta.collection.updateOne({title:'Rigatoni alla Genovese'}, {level: 'PEPE'});
      }
      
    } )


   // console.log(plato);
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


