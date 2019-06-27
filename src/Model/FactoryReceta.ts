import {EnumDishType, EnumLevel, Receta} from "./Receta";

const FactoryReceta = {
   Dummy(): Receta {

      /*crear una receta*/
      let model = new Receta();
      model.title = "receta dummy";
      model.level = EnumLevel.AMATEUR;
      model.ingredients = ['manzana', 'zanahoria'];
      model.cuisine = "callejera";
      model.dishType = EnumDishType.OTHER;
      model.duration = 3.1416;


      return model;
   },
   FromObject(o: any): Receta {
      let model = new Receta();

      model.title = o.title;
      model.level = o.level;
      model.ingredients = o.ingredients;
      model.cuisine = o.cuisine;
      model.dishType = o.dishType;

      if (o.image) {
         model.image = o.image;
      }

      model.duration = o.duration;
      model.creator = o.creator;


      return model;
   }

};

export default FactoryReceta;
