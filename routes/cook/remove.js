const express = require('express');
const router = express.Router();
const Cook = require('../../models/Cook');

router.post('/remove/:id', (req, res) => {
  let id = req.params.id;
  Cook.findOneAndDelete({_id: id})  
  .then(() => {
      res.redirect('/cook/list');
  })
  .catch((err)=> {
    console.log(err);
    res.send("Error");
  });
});

module.exports = router;