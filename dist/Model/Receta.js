"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnumLevel;
(function (EnumLevel) {
    EnumLevel["EASY"] = "Easy Peasy";
    EnumLevel["AMATEUR"] = "Amateur Chef";
    EnumLevel["PRO"] = "UltraPro Chef";
})(EnumLevel || (EnumLevel = {}));
exports.EnumLevel = EnumLevel;
var EnumDishType;
(function (EnumDishType) {
    EnumDishType["BREAKFAST"] = "Breakfast";
    EnumDishType["DISCH"] = "Dish";
    EnumDishType["SNACK"] = "Snack";
    EnumDishType["DRINK"] = "Drink";
    EnumDishType["DESERT"] = "Dessert";
    EnumDishType["OTHER"] = "Other";
})(EnumDishType || (EnumDishType = {}));
exports.EnumDishType = EnumDishType;
class Receta {
    constructor() {
        this.image = 'https://images.media-allrecipes.com/images/75131.jpg';
        this.created = new Date();
    }
}
exports.Receta = Receta;
//# sourceMappingURL=Receta.js.map