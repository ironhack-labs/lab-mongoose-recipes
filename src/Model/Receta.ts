
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

   title?: string;
   level?: EnumLevel;
   ingredients ?: string[];
   cuisine?: string;
   dishType?: EnumDishType;

   image?: string;

   duration?: number;
   creator?: string;
   created?: Date;

   constructor() {
      this.image = 'https://images.media-allrecipes.com/images/75131.jpg';
      this.created = new Date();
   }
}

export {Receta, EnumLevel, EnumDishType};
