const mongoose = require("mongoose")



// Esta es una funcion asincrona (async, antes de la funcion de flecha, y await, antes de mongoose)
const connectDB = async () => {

	console.log("Me estoy conectando a la base de datos")

    // El await es como un semaforo, es un esperar mientras me conecto a MongoDB
    // Conectar el proyecto con la base de datos, se utiliza await para conectarnos a otros servidores
    await mongoose.connect("mongodb://localhost:27017/recipe-app")
    
    console.log("Base de datos conectada")
}


module.exports = connectDB

