const mongoose = require('mongoose');
const express = require('express');
const router  = express.Router();
const Cook = require('../models/Cook');

// SHOW ALL COOKS 
router.get('/cooks', (req, res) => {
    Cook.find({})
    .then((cooks) => {
      res.render('cooks', {cooks})
    })
    .catch(err => {
      console.log(err)
    })
  })
  
// ADD A NEW COOK 
router.get('/add-cook', (req, res) => {
  res.render('add-cook');
})
  
router.post('/cook/add', (req, res) => {
  const { name } = req.body;
  const newCook = new Cook({name})
  newCook.save()
  .then((cook) => {
    res.redirect('/cooks');
  })
  .catch((error) => {
    console.log(error);
  })
});
  
// DELETE A COOK 
router.get('/cook/delete/:id', (req, res) => {
  Cook.deleteOne({_id : req.params.id})
  .then(recipe => {
    res.redirect('/cooks');
  })
    .catch((error) => {
      console.log(error)
    })
  })  

module.exports = router