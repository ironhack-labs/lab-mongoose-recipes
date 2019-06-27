import {prop, Typegoose, ModelType, InstanceType} from 'typegoose';
import {strict} from "assert";


enum EnumLevel {
   EASY = 'Easy Peasy',
   AMATEUR = 'Amateur Chef',
   PRO = 'UltraPro Chef',
}


enum EnumDishType {
   BREAKFAST = 'Breakfast',
   DISCH = 'Dish',
   SNACK = 'Snack',
   DRINK = 'Drink',
   DESERT = 'Dessert',
   OTHER = 'Other'

}

class Receta {
   @prop({required: true, unique: true})
   title?: string;

   @prop({enum: EnumLevel})
   level?: EnumLevel;

   @prop({})
   ingredients ?: string[];

   @prop({required: true})
   cuisine?: string;

   @prop({enum: EnumDishType})
   dishType?: EnumDishType;

   @prop({default: ' https://images.media-allrecipes.com/images/75131.jpg'})
   image?: string;

   @prop({min:0})
   duration?:number;

   @prop({})
   creator?:string;

   @prop({default:Date.now()})
   created?:Date;

}

export {Receta, EnumLevel, EnumDishType};
