"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelReceta_1 = require("./ModelReceta");
const ModelReceta_2 = require("./ModelReceta");
const FactoryReceta = {
    Dummy() {
        /*crear una receta*/
        let data = {};
        data.title = "receta dummy";
        data.level = ModelReceta_1.EnumLevel.AMATEUR;
        data.ingredients = ['manzana', 'zanahoria'];
        data.cuisine = "callejera";
        data.dishType = ModelReceta_1.EnumDishType.OTHER;
        data.duration = 3.1416;
        return new ModelReceta_2.ModelReceta(data);
    },
    FromObject(o) {
        let data = {};
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
        return new ModelReceta_2.ModelReceta(data);
    }
};
exports.default = FactoryReceta;
//# sourceMappingURL=FactoryReceta.js.map