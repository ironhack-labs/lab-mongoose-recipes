const express = require('express');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipes = require('./models/Recipes');


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  Recipes.create({
      title: 'Hot Dog',
      level: 'Amateur Chef',
      ingredients: ['Salchichas', 'Pan', 'Cebolla', 'Jitomate'],
      cuisine: 'American',
      dishType: ['Dish'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Hotdog_-_Evan_Swigart.jpg/1024px-Hotdog_-_Evan_Swigart.jpg',
      duration: 10,
      creator: 'Chef Daniel'
    })
    .then(Recipes=> {console.log('the recipes is saved and its title is:',Recipes.title)})
    .catch(err=> {console.log('an error happened', err) });
    
 Recipes.insertMany(data)
    .then(Recipes=> {console.log('Recipes are saved successfully')})
    .catch(err=> {console.log('an error insert', err) });
 
 Recipes.updateOne({title:"Rigatoni alla Genovese"}, {duration: 100})  
    .then(Recipes=> {console.log('Update duration')})
    .catch(err=> {console.log('an error update', err) });

 Recipes.deleteOne({title: "Carrot Cake"}) 
    .then(recipes=> {console.log('delete Carrot Cake'); mongoose.connection.close()})
    .catch(err=> {console.log('an error delete', err); mongoose.connection.close() });

