"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Receta_1 = require("./Receta");
const FactoryReceta = {
    Dummy() {
        /*crear una receta*/
        let model = new Receta_1.Receta();
        model.title = "receta dummy";
        model.level = Receta_1.EnumLevel.AMATEUR;
        model.ingredients = ['manzana', 'zanahoria'];
        model.cuisine = "callejera";
        model.dishType = Receta_1.EnumDishType.OTHER;
        model.duration = 3.1416;
        return model;
    },
    FromObject(o) {
        let model = new Receta_1.Receta();
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
exports.default = FactoryReceta;
//# sourceMappingURL=FactoryReceta.js.map