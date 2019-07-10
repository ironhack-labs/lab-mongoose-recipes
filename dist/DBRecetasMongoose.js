"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017";
/* ************************************************ */
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
const cx = mongoose.connect(url + "/recipeApp", { useNewUrlParser: true });
const Receta = require("./ModelMongoose/ModelReceta");
exports.default = {
    CollectionReceta: 'receta',
    cx,
    ModelReceta: Receta
};
//# sourceMappingURL=DBRecetasMongoose.js.map