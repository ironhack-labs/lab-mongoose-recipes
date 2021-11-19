const mongoose = require('mongoose');
const connectDB = async () => {
    //CONECTARNOS DESDE DE ESTE PROYECTO A LA BASE DE DATOS.
    await mongoose.connect('mongodb://localhost:27017/recipe-app');
    console.log('Base de Datos conectada');
};
module.exports = connectDB;
