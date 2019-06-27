import DBRecetas from "./DBRecetas";

import GetListaRecetas from "./GetListaRecetas";

import DBRecetasMongoose from "./DBRecetasMongoose";
import FactoryReceta from "./ModelMongoose/FactoryReceta";


const listaObjectFromData = GetListaRecetas();


const collReceta = DBRecetas.CollectionReceta;

const exe = async ()=> {


   console.log('Mongoose WAY ******************************\n\n');


   try{
      await DBRecetasMongoose.cx;

      console.log('Mongoose - cx is ready');

      //Preparar coleccion clean  --------------

      await DBRecetasMongoose.cx.dropDatabase;

      //Iteration 2 - Create a recipe -----
      console.log('Iteration 2- crear receta!');

      let receta= FactoryReceta.Dummy();

      await receta.save();
      console.log('Registro creado');

      await  DBRecetasMongoose.cx.close;

   } catch (e) {
      console.log(e);
   }

   console.log('************* Fin ********* ')
};





exe();

