import mongoose, {Document, Schema} from "mongoose";


export enum EnumLevel {
   EASY = 'Easy Peasy',
   AMATEUR = 'Amateur Chef',
   PRO = 'UltraPro Chef',
}


export enum EnumDishType {
   BREAKFAST = 'Breakfast',
   DISH = 'Dish',
   SNACK = 'Snack',
   DRINK = 'Drink',
   DESERT = 'Dessert',
   OTHER = 'Other'

}


export interface IReceta extends Document {
   id: any,
   title: string,
   level: EnumLevel,
   ingredients: string[],
   cuisine: string,
   dishType: EnumDishType,
   image: string,
   duration: number,
   creator: string,
   created: Date
}

export const RecetaSchema: Schema = new Schema(
    {
       title: {type: String, required: true, unique: true},
       level: {type: String, enum: [EnumLevel.EASY, EnumLevel.AMATEUR, EnumLevel.PRO]},
       ingredients: {type: [String]},
       cuisine: {type: String},
       dishType: {
          type: String,
          enum: [EnumDishType.BREAKFAST, EnumDishType.DISH, EnumDishType.SNACK, EnumDishType.DRINK, EnumDishType.DESERT, EnumDishType.OTHER]
       },
       image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
       duration: {type: Number},
       creator: {type: String},
       created: {type: Date, default: Date.now}

    })
;

export  const ModelReceta = mongoose.model<IReceta>('receta', RecetaSchema);


