const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const data = require('../data');

//create
router.get('/new', (req,res)=>{
    Recipe.create({
        title:'pastel', 
        level:'UltraPro Chef',
        cousine: 'pasteleria',
    })
    .then(recipe=>res.send('receta creada'))
    .catch(err=>res.send(err));
});

//read
router.get('/many', (req,res)=>{
    Recipe.insertMany(data)
    .then(items=>res.render('lista',{items}))
    .catch(err=>res.send(err));
   
});

//update
router.get('/update/:id', (req,res)=>{
    Recipe.findByIdAndUpdate(req.params.id, {duration:100})
    .then(recipe=>{
        res.send('food modificada');
    })
    .catch(err=>{
        res.send('algo malo pasó');
    });
});

//delete
router.get('/:id/delete', (req,res)=>{
    Recipe.findByIdAndRemove(req.params.id)
    .then((err)=>{
        res.send('Borrado la food: ' + req.params.id);
    });
});

module.exports = router;