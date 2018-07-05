const mongoose = require('mongoose');
const express = require('express');
const app  = express();
const Schema   = mongoose.Schema;
const data = require('./data.js')
const Recipe = require('./models/Recipe')

mongoose.connect('mongodb://localhost:27017/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


app.use('/new', (req,res)=>{
  Recipe.create({
    title:'lolol',
    level:'Easy Peasy',
    ingredients:['pollo'],
    cousine:'International',
    dishType:'Dish',
    duration:5,
    creator:'sho',    
  })
  .then(recipes=>{
    console.log('Receta hecha', recipes.title);
  })
  .catch(err=>{
    res.send(err)
  })
})

app.get('/newmany', (req,res)=>{
  Recipe.insertMany(data)
  .then(res=>{
    console.log('recetas importadas')
  })
  .catch(err=>{
    console.log(err)
  });
})

app.get('/update/:id', (req,res)=>{
  Recipe.findByIdAndUpdate(req.params.id, {duration: 100})
  .then(res=>{
    console.log('receta actualizada')
  })
  .catch(err=>{
    console.log(err)
  });
})

app.get('/:id/delete', (req,res)=>{
  Recipe.findByIdAndRemove(req.params.id)
  .then(res=>{
    console.log('receta borrada')
  })
  .catch(err=>{
    console.log(err)
  });
})


app.listen(3000, ()=>{
  console.log('Oyendo')
});