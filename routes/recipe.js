const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

//delete
router.get('/:id/delete', (req,res)=>{
    Recipe.findByIdAndRemove(req.params.id)
    .then((err)=>{
        res.send('Recipe deleted: ' + req.params.id);
    });
});

//update
router.get('/update/:id', (req,res)=>{
    Recipe.findByIdAndUpdate(req.params.id, {duration:100})
    .then(food=>{
        res.send('Recipe updated');
    })
    .catch(err=>{
        res.send('algo malo pasó');
    });
});

//create
router.get('/new', (req,res)=>{
    Recipe.create({
        title:'Pastel de chocolate', 
        level:'Amateur Chef',
        ingredients:['harina', 'azúcar', 'huevos', 'chocolate', 'leche', 'mantequilla'],
        cuisine: 'clásico',
        dishType: 'Dessert',
        duration: 60,
        creator: 'Yan y Beth',
    }, (err,recipe)=>{
        res.send('receta creada');
        console.log('recipe title')
    })
});

//insertMany
router.get('/data', (req,res)=>{
    Recipe.insertMany(require('../data'))
    .then(r => res.send(r), console.log('recipe title'))
    .catch(err => res.send(err))
})


module.exports = router;
