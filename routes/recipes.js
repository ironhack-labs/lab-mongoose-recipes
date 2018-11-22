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
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
        .then(() => {
            console.log('done!');
        })
        .catch(e => next(e))
})

router.get('/detele',(req, res , next)=>{
    Recipe.deleteOne({title: "Carrot Cake" })
        .then(() => {
            console.log("deleted!");
            mongoose.connection.close()
        })
        .catch(err => console.log(err));
})

router.get('/close',(req, res , next)=> {
    mongoose.connection.close()
})
module.exports = router;