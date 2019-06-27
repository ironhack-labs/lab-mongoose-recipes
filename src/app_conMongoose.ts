import DBRecetas from "./DBRecetas";

import GetListaRecetas from "./GetListaRecetas";

import DBRecetasMongoose from "./DBRecetasMongoose";
import {EnumDishType, EnumLevel, ModelReceta} from "./ModelMongoose/ModelReceta";


const listaObjectFromData = GetListaRecetas();


const collReceta = DBRecetas.CollectionReceta;

const exe = async () => {


   console.log('Mongoose WAY ******************************\n\n');


   try {
      await DBRecetasMongoose.cx;

      console.log('Mongoose - cx is ready');

      //Preparar coleccion clean  -------------------------------------------------

      await ModelReceta.deleteMany({});

      //Iteration 2 - Create a recipe ---------------------------------------------
      console.log('Iteration 2- crear receta!');

      let receta = new ModelReceta({
         title: "receta dummy",
         level: EnumLevel.AMATEUR,
         ingredients: ['manzana', 'zanahoria'],
         cuisine: "callejera",
         dishType: EnumDishType.OTHER,
         duration: 3.1416,
      });

      await receta.save();
      console.log('Registro creado');

      //Iteration 3 - Inser Many -----------------------------------------------------
      console.log('Iteration 3- insert many');

      let result: any;

      await ModelReceta.collection.insertMany(listaObjectFromData)
          .then(data => {
             result = data;
          });
      //console.log(result);

      //Iteration 4 - Inser Many -----------------------------------------------------
      console.log('Iteracion 4 - Update Recete');

      const filter = {'title': {'$eq': 'Rigatoni alla Genovese'}};
      const dataUpdate: object = {
         duration: 100
      };

      await ModelReceta.updateOne(filter,dataUpdate);

      console.log('ok update');

      //Iteration 5 - delete -----------------------------------------------------
      console.log('Iteracion 5 - remove Recipe');
      const filterDelete = {'title': {'$eq': 'Carrot Cake'}};

      await ModelReceta.deleteOne(filterDelete);

      console.log('OK deleted');


      await DBRecetasMongoose.cx.close;


   } catch (e) {
      console.error(e);
   }

   console.log('************* Fin ********* ')
};


exe();

