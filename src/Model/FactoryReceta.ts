import {EnumLevel, Receta} from "./Receta";

const FactoryReceta = {

   Dummy(): Receta {

      /*crear una receta*/
      let model = new Receta();
      model.level = EnumLevel.AMATEUR;
      model.title = "xxx";


      return model;
   },
   FromObject(o:object): Receta {
      let model = new Receta();

      return  model;
   }

};

export  default FactoryReceta;
