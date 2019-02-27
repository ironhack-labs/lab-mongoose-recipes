const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

const Recetas = require('./models/Rcetas.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');

    Recetas.create({
        title: 'Migas',
        cuisine: 'andaluza'
      })
      .then(recipesAdded => {
        console.log(recipesAdded.title, "<-----")
      })

      .then(() => Recetas.insertMany(data))
      .then(recipesAdded => {
        recipesAdded.forEach(element => {
          console.log(element.title)
        })
      })
      .then(() => Recetas.updateMany({
        duration: 100
      }))

      .then(() => console.log('Cambiada la duracion!!'))


      .then(() => Recetas.deleteOne({
        title: 'Migas'
      }))

      .then(() => console.log('AdiosMIgaaaaaassss!!!'))

      .then(() => mongoose.connection.close().then(() => console.log("Feliz navidad")))



      .catch(err => {
        console.error('Error connecting to mongo', err)
      })


  })