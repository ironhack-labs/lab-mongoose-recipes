const mongoose = require('mongoose');
const express = require("express");

const router = express.Router();

const data = require("../data.json")
const Recipe = require('../models/Recipe.model');
const { json } = require('express/lib/response');

// no insomnia: http://localhost:8080/recipes/create-recipe
router.post('/create-recipe', async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body);        
        return res.status(201).json(newRecipe)
    } catch (err) {
        return res.status(500).json(err);
    }
});

// no insomnia: http://localhost:8080/recipes/create-posts
router.post("/create-posts", async (req, res) => {
    try {        
        const newRecipes = await Recipe.insertMany(data);        
        return res.status(201).json(newRecipes);
    } catch (err) {
        return res.status(500).json(err);
    }     
});


// no insomnia: http://localhost:8080/recipes/update/Carrot%20Cake/100
router.put('/update/:title/:duration', async (req, res) => {
    const { title, duration } = req.params;
    try {
        const updateRecipe = await Recipe.findOneAndUpdate({ title: title }, {duration: Number(duration)})
        return res.status(200).json(updateRecipe)
    } catch (error) {
        return res.status(500).json(error);
    }
});

// no insomnia: http://localhost:8080/recipes/delete/Carrot%20Cake
router.delete('/delete/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const deleteRecipe = await Recipe.deleteOne({ title: title });
        return res.status(200).json(deleteRecipe);
    } catch (error) {
        return res.status(500).json(error);
    }
});



module.exports = router;
