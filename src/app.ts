import DBRecetas from "./DBRecetas";
import {EnumLevel, Receta} from "./Model/Receta";
import GetListaRecetas from "./GetListaRecetas";
import FactoryReceta from "./Model/FactoryReceta";


const listaRecetas = GetListaRecetas();


const collName = DBRecetas.CollectionReceta;

let exe = async () => {

   //Preparar coleccion --------------
   await DBRecetas.connect
       .then((client) => {
          console.log('Base - Cx to Mongo ok!');

          //eliminar toda la coleccion
          return client.db('recipeApp').collection(collName).deleteMany({});

       })
       .then((result) => {
          console.log(`Base - coleccion eliminada: ${collName}`);

       })
       .catch((err) => {
          console.error('Error connecting to mongo', err);
       })
   ;


   //Iteration 2 - Create a recipe -----

   await DBRecetas.connect
       .then((client) => {

          console.log('Iteration 2- Cx to Mongo ok!');

          let receta = FactoryReceta.Dummy();

          return client.db('recipeApp').collection(collName).insertOne(receta);

       })
       .then((result) => {
          console.log('iteration 2- create a recipe ok');

       })
       .catch((err) => {
          console.error('Error create a recipe', err);
       })
   ;


   //Iteration 3 - Insert Manu recipes

   await DBRecetas.connect
       .then((client) => {

          console.log('Iteracion 3- Cx to Mongo ok!');


          let listaInsertModel = listaRecetas.map<Receta>(item => {
             return FactoryReceta.FromObject(item);
          });


          return client.db('recipeApp').collection(collName).insertMany(listaInsertModel);

       })
       .then((result) => {
          console.log('iteration 3- Many recipes ok');

       })
       .catch((err) => {
          console.error('Error create a recipe', err);
       })
   ;


};


exe();

