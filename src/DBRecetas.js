"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var url = "mongodb://localhost:27017";
var connectPromise = mongodb_1.MongoClient.connect(url, { useNewUrlParser: true });
/* ************************************************ */
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var connectMongoose = mongoose.connect(url + "/recipeApp", { useNewUrlParser: true });
var Receta = require("./Model/Receta");
exports.default = {
    connect: connectPromise,
    connectMongoose: connectMongoose,
    Receta: Receta,
    close: function () {
        connectPromise.then(function (db) { return db.close(); });
        connectMongoose.disconnect();
    }
};
//# sourceMappingURL=DBRecetas.js.map