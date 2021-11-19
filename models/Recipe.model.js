const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

/**
 * MODELOS
 * Los modelos son moldes que nos permiten determinar todas las propiedades que debe de tener una petición de creación hacia la base de datos.
 * Los requisitos para generar un gato, en este caso.
 */