import {MongoClient} from "mongodb"


const url = "mongodb://localhost:27017";

const connectPromise = MongoClient.connect(url, {useNewUrlParser: true});


/* ************************************************ */

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connectMongoose = mongoose.connect(url + "/recipeApp", {useNewUrlParser: true});

const Receta = require("./Model/Receta");

export default {
   CollectionReceta:'receta',
   connect: connectPromise,
   connectMongoose,
   Receta,
   close: function () {
      connectPromise.then(db => db.close());
      connectMongoose.disconnect();
   }
}
