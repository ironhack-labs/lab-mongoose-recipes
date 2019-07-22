const express = require('express');
const router = express.Router();
const Cook = require('../../models/Cook');

router.post('/cook/remove/:id', (req, res) => {
  let id = req.params.id;
  Cook.findOneAndDelete({_id: id})  
  .then(() => {
      res.redirect('/cook/list');
  });
});

module.exports = router;