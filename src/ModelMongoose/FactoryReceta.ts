import {IReceta, EnumDishType, EnumLevel} from "./Receta";
import DBRecetasMongoose from "../DBRecetasMongoose";
import {Receta} from "./Receta";



const FactoryReceta = {
   Dummy(): IReceta {

      /*crear una receta*/

      let data: any = {};

      data.title = "receta dummy";
      data.level = EnumLevel.AMATEUR;
      data.ingredients = ['manzana', 'zanahoria'];
      data.cuisine = "callejera";
      data.dishType = EnumDishType.OTHER;
      data.duration = 3.1416;

      return new Receta(data);
   },
   FromObject(o: any): IReceta {
      let data: any = {};

      data.title = o.title;
      data.level = o.level;
      data.ingredients = o.ingredients;
      data.cuisine = o.cuisine;
      data.dishType = o.dishType;

      if (o.image) {
         data.image = o.image;
      }

      data.duration = o.duration;
      data.creator = o.creator;

      return new Receta(data);

   }

};

export default FactoryReceta;
