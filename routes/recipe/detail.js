const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');

router.get('/detail/:id', (req, res) => {
  let id = req.params.id;
  Recipe.findById(id)  
  .populate("cook")  
  .then((recipe) => {
      res.render('recipe/detail', {recipe});
    })
    .catch((err)=> {
      console.log(err);
      res.send("Error");
    });
  });

module.exports = router;