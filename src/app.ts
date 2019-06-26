import DBRecetas from "./DBRecetas";
import {EnumLevel, Receta} from "./Model/Receta";
import GetListaRecetas from "./GetListaRecetas";




const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

const listaRecetas = GetListaRecetas();



DBRecetas.connect
    .then((client) => {

       console.log('Connected to Mongo!');

       /*crear una receta*/
       let r1 = new Receta();
       r1.level = EnumLevel.AMATEUR;
       r1.title = "xxx";

       return client.db('recipeApp').collection("receta").insertOne(r1);

    })
    .then(newRecord => {

       console.log('new registro creado');


    })
    .catch((err) => {
       console.error('Error connecting to mongo', err);
    })
;

