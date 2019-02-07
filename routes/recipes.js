const router = require('express').Router();
let Recipe = require('../models/Recipe');
// const mongoose = require('mongoose');
const data = require('../data');


router.get ('/', (req, res)=>{
	Recipe.find()
			.then(recipes=>res.json(recipes))
			.catch(e=>res.send(e))
});

router.get ('/log', (req, res)=>{
	Recipe.create({
		title: "Globadorporpop",
		level: "Easy Peasy",
		ingredients: ['Globadorporp', 'Fleeb Juice', 'Grumbo'],
		cuisine: "Alien",
		dishType:"Breakfast",
		image:"https://vignette.wikia.nocookie.net/rickandmorty/images/e/e2/Garblovian.png/revision/latest?cb=20160522164233",
		duration: 420,
		creator: "Rick Sánchez",
	})
			.then(Recipe=>{
				res.send(`Recipe ${Recipe.title} Created`)
			})
			.catch(e=>res.send(e))
});

router.get ('/import', (req, res)=>{
	Recipe.insertMany(data)
			.then(()=>{
				res.send(`Recipes imported successfully`)
			})
			.catch(e=>res.send(`Nothing worked.`))
});

router.get ('/update', (req, res)=>{
	Recipe.updateOne({name:'Rigatoni alla Genovese'},{duration: 100})
		.then(()=>{
			res.send(`Recipe Rigatoni alla Genovese updated correctly`)
		})
		.catch(e=>res.send(e))
});

router.get ('/remove', (req, res)=>{
	Recipe.deleteOne({name:'Carrot Cake'})
			.then(()=>{
				res.send(`Recipe Carrot Cake deleted correctly`)
			})
			.catch(e=>res.send(e))
});

module.exports = router;