import {MongoClient} from "mongodb"


const url = "mongodb://localhost:27017";

const connectPromise = MongoClient.connect(url, {useNewUrlParser: true});


/* ************************************************ */


const Receta = require("./Model/Receta");

export default {
   CollectionReceta:'receta',
   connect: connectPromise,
   Receta,
   close: function () {
      connectPromise.then(db => db.close());
   }
}
