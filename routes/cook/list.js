const express = require('express');
const router = express.Router();
const Cook = require('../../models/Cook');

router.get('/list', (req, res) => {
  Cook.find({})  
  .then((cooks) => {
      res.render('cook/list', {cooks});
    })
  .catch((err)=> {
    console.log(err);
    res.send("Error");
  })
});

module.exports = router;