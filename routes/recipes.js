const router = require('express').Router()
let recipe = require('../models/recipe')
const mongoose = require('mongoose')

router.get ('/', (req, res)=>{
	recipe.find()
			.then(recipes=>res.json(recipes))
			.catch(e=>res.send(e))
});

router.get ('/log', (req, res)=>{
	recipe.create({
		title: "Globadorporpop",
		level: "Easy Peasy",
		ingredients: ['Globadorporp', 'Fleeb Juice', 'Grumbo'],
		cuisine: "Alien",
		dishType:"Breakfast",
		image:"https://vignette.wikia.nocookie.net/rickandmorty/images/e/e2/Garblovian.png/revision/latest?cb=20160522164233",
		duration: 420,
		creator: "Rick Sánchez",
	})
			.then(recipe=>{
				res.send(`Recipe ${recipe.title} Created`)
			})
			.catch(e=>res.send(e))
});

router.get ('/import', (req, res)=>{
	recipe.insertMany(data)
			.then(recipe=>{
				res.send(`Recipe of ${recipe.title} added successfully`)
			})
			.catch(e=>res.send(`Nothing worked.`))
});

module.exports = router