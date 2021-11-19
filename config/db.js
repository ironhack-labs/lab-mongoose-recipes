// PATRON MODULAR
//Instalar una libreria que hable con nuestra base de datos - mongoose (npm install mongoose)
//enbajador entre base de datos y servidor
const mongoose          = require("mongoose")  //<-------------- LLAMAR A MONGO

// Activan 👇 caracteristica de procesos asincronos
const connectDB = async() => {

  await mongoose.connect("mongodb://localhost:27017/lab-mongoose-recipes")
    
  console.log("Base de datos VIVA")
}


module.exports = connectDB