const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

//Create
router.get('/create', (req, res)=>{
  Recipe.create({
    title: 'Espaguetti a la Bolognesa',
    level: 'Amateur Chef',
    ingredients: ['espaguetti', 'meat', 'tomato sauce'],
    cousine: 'Italiana',
    dishType: 'Dish',
    duration: 30,
    creator: 'Bliss'
  })
  .then(recipe => {
    console.log(recipe.title);
    res.send('Recipe ' + recipe.title + ' creada');
  })
  .catch(err => {
    res.send('Error: ' + err);
  });
});

//Create Many
router.get('/create-many', (req, res) => {
  Recipe.insertMany(require('../data'))
  .then(r => {
    console.log(r);
    res.send(r);
  })
  .catch(err=>{
    console.log(err);
    res.send(err);
  });
});

//Read

//Update
router.get('/:id/update', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, {duration: 100})
  .then(item=>{
    console.log('Se actualizó ' + item.title);
    res.send('Se actualizó ' + item.title);
  })
  .catch(err=>{
    console.log(err);
    res.send(err);
  });
});

//Delete
router.get('/:id/delete', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id)
  .then(r=>{
    console.log('Deleted ' + r.title);
    res.send('Deleted ' + r.title);
  })
  .catch(err=>{
    console.log(err);
    res.send(err);
  });
});

module.exports = router;