"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DBRecetas_1 = __importDefault(require("./DBRecetas"));
const GetListaRecetas_1 = __importDefault(require("./GetListaRecetas"));
const DBRecetasMongoose_1 = __importDefault(require("./DBRecetasMongoose"));
const ModelReceta_1 = require("./ModelMongoose/ModelReceta");
const listaObjectFromData = GetListaRecetas_1.default();
const collReceta = DBRecetas_1.default.CollectionReceta;
const exe = async () => {
    console.log('Mongoose WAY ******************************\n\n');
    try {
        await DBRecetasMongoose_1.default.cx;
        console.log('Mongoose - cx is ready');
        //Preparar coleccion clean  -------------------------------------------------
        await ModelReceta_1.ModelReceta.deleteMany({});
        //Iteration 2 - Create a recipe ---------------------------------------------
        console.log('Iteration 2- crear receta!');
        let receta = new ModelReceta_1.ModelReceta({
            title: "receta dummy",
            level: ModelReceta_1.EnumLevel.AMATEUR,
            ingredients: ['manzana', 'zanahoria'],
            cuisine: "callejera",
            dishType: ModelReceta_1.EnumDishType.OTHER,
            duration: 3.1416,
        });
        await receta.save();
        console.log('Registro creado');
        //Iteration 3 - Inser Many -----------------------------------------------------
        console.log('Iteration 3- insert many');
        let result;
        await ModelReceta_1.ModelReceta.collection.insertMany(listaObjectFromData)
            .then(data => {
            result = data;
        });
        //console.log(result);
        //Iteration 4 - Inser Many -----------------------------------------------------
        console.log('Iteracion 4 - Update Recete');
        const filter = { 'title': { '$eq': 'Rigatoni alla Genovese' } };
        const dataUpdate = {
            duration: 100
        };
        await ModelReceta_1.ModelReceta.updateOne(filter, dataUpdate);
        console.log('ok update');
        //Iteration 5 - delete -----------------------------------------------------
        console.log('Iteracion 5 - remove Recipe');
        const filterDelete = { 'title': { '$eq': 'Carrot Cake' } };
        await ModelReceta_1.ModelReceta.deleteOne(filterDelete);
        console.log('OK deleted');
        await DBRecetasMongoose_1.default.cx.close;
    }
    catch (e) {
        console.error(e);
    }
    console.log('************* Fin ********* ');
};
exe();
//# sourceMappingURL=app_conMongoose.js.map