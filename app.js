// imports
const express = require('express')
const hbs = require('hbs')
const mongoose = require('mongoose')
const path = require('path')
const port = 3000;

const app = express()
// view engine
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
// statics
app.use(express.static(path.join(__dirname, 'public')))

// db conection
mongoose.connect('mongodb://localhost/recipes',
    () => console.log("conected to DB"))

const recipes = require('./routes/recipes')
app.use('/', recipes)

// listener
app.listen(port, () => console.log('3000 port'))
