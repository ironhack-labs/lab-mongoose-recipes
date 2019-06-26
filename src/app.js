"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DBRecetas_1 = __importDefault(require("./DBRecetas"));
var Receta_1 = require("./Model/Receta");
var mongoose = require('mongoose');
var Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
var data = require('./data.js'); // Import of the data from './data.js'
DBRecetas_1.default.connect
    .then(function (client) {
    console.log('Connected to Mongo!');
    /*crear una receta*/
    var r1 = new Receta_1.Receta();
    r1.level = Receta_1.EnumLevel.AMATEUR;
    r1.title = "xxx";
    return client.db('recipeApp').collection("receta").insertOne(r1);
})
    .then(function (newRecord) {
    console.log('new registro creado');
})
    .catch(function (err) {
    console.error('Error connecting to mongo', err);
});
//# sourceMappingURL=app.js.map