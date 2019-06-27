import DBRecetas from "./DBRecetas";
import {Receta} from "./Model/Receta";
import GetListaRecetas from "./GetListaRecetas";
import FactoryReceta from "./Model/FactoryReceta";


const listaObjectFromData = GetListaRecetas();


const collName = DBRecetas.CollectionReceta;

console.log('Mongo WAY ****************************************************\n\n');


const exe = async ()=> {

   //Preparar coleccion clean  --------------
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


   //Iteration 3 - Insert Many recipes

   await DBRecetas.connect
       .then((client) => {

          console.log('Iteracion 3- Cx to Mongo ok!');


          let listaModel = listaObjectFromData.map<Receta>(item => {
             return FactoryReceta.FromObject(item);
          });


          return client.db('recipeApp').collection(collName).insertMany(listaModel);

       })
       .then((result) => {
          console.log('iteration 3- Many recipes ok');

       })
       .catch((err) => {
          console.error('Error create a recipe', err);
       })
   ;

   //Iteration 4 - Update recipe

   await DBRecetas.connect
       .then((client) => {

          console.log('Iteracion 4 - Update Recibe');

          let filter = {'title': {'$eq': 'Rigatoni alla Genovese'}};

          let dataUpdate: object = {
             duration: 100
          };

          return client.db('recipeApp').collection(collName).updateOne(filter, {"$set": dataUpdate});

       })
       .then((model) => {
          console.log('OK updated');

       })
       .catch((err) => {
          console.error('Error en paso 4 - uypdate recipe', err);
       })
   ;

   //Iteration 5 - remove recipe

   await DBRecetas.connect
       .then((client) => {

          console.log('Iteracion 5 - remove Recipe');

          let filter = {'title': {'$eq': 'Carrot Cake'}};


          return client.db('recipeApp').collection(collName).deleteOne(filter);

       })
       .then((model) => {
          console.log('OK deleted');

       })
       .catch((err) => {
          console.error('Error en paso 5 - delete recipe', err);
       })
   ;


   DBRecetas.close();

   console.log('\n ********** fin *******************');
};





exe();

