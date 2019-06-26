import {prop, Typegoose, ModelType, InstanceType} from 'typegoose';


enum EnumLevel {
   EASY = 'Easy Peasy',
   AMATEUR = 'Amateur Chef',
   PRO = 'UltraPro Chef',
}


class Receta {
   @prop({required: true, unique: true})
   title?: string;

   @prop({enum: EnumLevel})
   level?: EnumLevel
}

export {Receta, EnumLevel};
