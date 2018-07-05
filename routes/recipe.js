const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

//create
router.get('/new', (req, res) => {
  Recipe.create({
    title: 'chilaquiles verdes',
    level: 'Easy Peasy',
    ingredients: ['totopos', 'salsa verde', 'queso', 'crema'],
    cuisine: 'Mexican',
    dishType: 'Breakfast',
    duration: 30,
    creator: 'Pancho Villa',
  })
  .then(recipe=>res.send(console.log(recipe.title)))
  .catch(err=>res.send(err));
});

router.get('/lots', (req, res) => {
  Recipe.insertMany(require('../data'))
  .then(result=>res.send(result))
  .catch(err=>res.send(err));
});

router.get('/update/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, {duration: 100})
  .then(recipe=>{res.send('recipe modificada')})
  .catch(err=>{res.send('algo malo pasó')});
});

router.get('/:id/delete', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id)
  .then((err) => {
    res.send('Receta borrada ' + req.params.id);
  });
})

module.exports = router;