const mongoose = require('mongoose');

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Recipe = require('./models/Recipe.model');

const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';



mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe
      .create({ title: "Pasta con huevo y ketchup", level: 'Easy Peasy', ingredietns: "Pasta, huevos, ketchup", cuisine: "Italian", dishType: 'main_course', image: "https://img-global.cpcdn.com/recipes/1c5ce9956b195e58/640x640sq70/photo.webp", duration: 20, creator: "Jaime", created: 2023 / 01 / 06 })

  })
  .then(() => {
    return Recipe
      .create(data)

  })
  .then(() => {
    return Recipe
      .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then(() => {
    return Recipe.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


app.listen(5005, () => console.log('SERVIDOR LEVANTADO EN 5005'))

