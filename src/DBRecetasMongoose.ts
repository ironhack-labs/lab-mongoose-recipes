const mongoose = require("mongoose");


const url = "mongodb://localhost:27017";


/* ************************************************ */


mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);

const cx = mongoose.connect(url + "/recipeApp", {useNewUrlParser: true});

const Receta = require("./ModelMongoose/Receta");

export default {
   CollectionReceta: 'receta',
   cx,
   ModelReceta: Receta
}
