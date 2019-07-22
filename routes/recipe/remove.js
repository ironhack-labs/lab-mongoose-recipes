const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');

router.post('/recipe/remove/:id', (req, res) => {
  let id = req.params.id;
  Recipe.findOneAndDelete({_id: id})  
  .then(() => {
    res.redirect('/recipe/list');
  });
});

module.exports = router;