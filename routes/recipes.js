const express = require('express')
const router = express.Router()
const Recipe = require('../recipes')
const data = require('../data')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/new', (req, res) => {
    Recipe.create({
        title: 'Chocolate Chip Cookies',
        level: 'Amateur Chef',
        ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet chocolate chips'],
        cuisine: 'French',
        dishType: ['Dish'],
        image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
        duration: 30,
        creator: 'Chef Jennifer'
    })
        .then(recipe => {
            res.send(`Titulo de receta: ${recipe.title}`)
        })
        .catch()
})

router.get('/recipe', (req, res, next) => {
    Recipe.find()
        .then(recipes => {
            res.send('Array inserted')
        })
        .catch(e => next(e))
})

router.get('/newrecipes',(req, res, next) => {
    console.log(data);
    Recipe.insertMany(data,function(error, docs) {})
    /*Recipe.insertMany(data)
        .then(recipes =>{
            console.log(recipes)

    })
        .catch(e => next(e))*/
})

router.get('/updaterecipe',(req, res , next)=>{
    Recipe.findByIdAndUpdate(id, { $set: { size: 'large' }}, { new: true }, function (err, tank) {
        if (err) return handleError(err);
        res.send(tank);
    });
})

module.exports = router;