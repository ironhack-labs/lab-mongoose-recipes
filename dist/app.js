"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DBRecetas_1 = __importDefault(require("./DBRecetas"));
const GetListaRecetas_1 = __importDefault(require("./GetListaRecetas"));
const FactoryReceta_1 = __importDefault(require("./Model/FactoryReceta"));
const listaObjectFromData = GetListaRecetas_1.default();
const collName = DBRecetas_1.default.CollectionReceta;
console.log('Mongo WAY ****************************************************\n\n');
const exe = async () => {
    //Preparar coleccion clean  --------------
    await DBRecetas_1.default.connect
        .then((client) => {
        console.log('Base - Cx to Mongo ok!');
        //eliminar toda la coleccion
        return client.db('recipeApp').collection(collName).deleteMany({});
    })
        .then((result) => {
        console.log(`Base - coleccion eliminada: ${collName}`);
    })
        .catch((err) => {
        console.error('Error connecting to mongo', err);
    });
    //Iteration 2 - Create a recipe -----
    await DBRecetas_1.default.connect
        .then((client) => {
        console.log('Iteration 2- Cx to Mongo ok!');
        let receta = FactoryReceta_1.default.Dummy();
        return client.db('recipeApp').collection(collName).insertOne(receta);
    })
        .then((result) => {
        console.log('iteration 2- create a recipe ok');
    })
        .catch((err) => {
        console.error('Error create a recipe', err);
    });
    //Iteration 3 - Insert Many recipes
    await DBRecetas_1.default.connect
        .then((client) => {
        console.log('Iteracion 3- Cx to Mongo ok!');
        let listaModel = listaObjectFromData.map(item => {
            return FactoryReceta_1.default.FromObject(item);
        });
        return client.db('recipeApp').collection(collName).insertMany(listaModel);
    })
        .then((result) => {
        console.log('iteration 3- Many recipes ok');
    })
        .catch((err) => {
        console.error('Error create a recipe', err);
    });
    //Iteration 4 - Update recipe
    await DBRecetas_1.default.connect
        .then((client) => {
        console.log('Iteracion 4 - Update Recibe');
        let filter = { 'title': { '$eq': 'Rigatoni alla Genovese' } };
        let dataUpdate = {
            duration: 100
        };
        return client.db('recipeApp').collection(collName).updateOne(filter, { "$set": dataUpdate });
    })
        .then((model) => {
        console.log('OK updated');
    })
        .catch((err) => {
        console.error('Error en paso 4 - uypdate recipe', err);
    });
    //Iteration 5 - remove recipe
    await DBRecetas_1.default.connect
        .then((client) => {
        console.log('Iteracion 5 - remove Recipe');
        let filter = { 'title': { '$eq': 'Carrot Cake' } };
        return client.db('recipeApp').collection(collName).deleteOne(filter);
    })
        .then((model) => {
        console.log('OK deleted');
    })
        .catch((err) => {
        console.error('Error en paso 5 - delete recipe', err);
    });
    DBRecetas_1.default.close();
    console.log('\n ********** fin *******************');
};
exe();
//# sourceMappingURL=app.js.map