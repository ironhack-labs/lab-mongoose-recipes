const mongoose = require('mongoose');
//const Schema   = mongoose.Schema;
//añadimos el modelo
const Recipe = require('./models/recipe.model');
const recipes = require('./data.js');
//conectdos a la bbdd
require('./configs/db.config');


