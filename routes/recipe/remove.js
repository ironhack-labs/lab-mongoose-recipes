const express = require('express');
const router = express.Router();
const Recipe = require('../../models/Recipe');

router.post('/remove/:id', (req, res) => {
  let id = req.params.id;
  Recipe.findOneAndDelete({_id: id})  
  .then(() => {
    res.redirect('/recipe/list');
  })
  .catch((err)=> {
    console.log(err);
    res.send("Error");
  });
});

module.exports = router;