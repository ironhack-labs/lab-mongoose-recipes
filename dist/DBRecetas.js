"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const url = "mongodb://localhost:27017";
const connectPromise = mongodb_1.MongoClient.connect(url, { useNewUrlParser: true });
/* ************************************************ */
const Receta = require("./Model/Receta");
exports.default = {
    CollectionReceta: 'receta',
    connect: connectPromise,
    Receta,
    close: function () {
        connectPromise.then(db => db.close());
    }
};
//# sourceMappingURL=DBRecetas.js.map