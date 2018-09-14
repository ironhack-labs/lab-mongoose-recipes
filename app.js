// importaciones
// servidor web - escucha peticiones
const express = require('express')
// motor de templates - construye paginas
const hbs = require('hbs')
// base de datos - manipular, comunicar 
const mongoose = require('mongoose')
// las rutas son mas que texto
const path = require('path')
// variable del puerto
const port = 3000;

// configuraciones basicas
const app = express()
// view engine
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
// statics
app.use(express.static(path.join(__dirname, 'public')))

// configuracion avanzada
mongoose.connect('mongodb://localhost:27017/recipes',
  () => console.log("conectado a la base de datos"))
// rutas
// app.get('/', (req, res) => {
//   res.render('home')
// })
const recipes = require('./routes/recipes')
app.use('/', recipes)

// listener
app.listen(port, () => console.log('escuchando en el puerto 3000'))


