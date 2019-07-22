const express = require('express');
const router = express.Router();
const Cook = require('../../models/Cook');

router.get('/cook/list', (req, res) => {
  Cook.find({})  
  .then((cooks) => {
      res.render('cook/list', {cooks});
    });
});

module.exports = router;