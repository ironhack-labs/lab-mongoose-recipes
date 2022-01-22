require('./config/db.config')

const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data');

mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
  .then( () => console.log('Database has ben cleared!')) 
  .then( () => Recipe.create(data) )
  .then( result => {
    result.forEach(elem => console.log(elem.title))
    return Recipe.findOneAndUpdate({ name: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  })
  .then( result => {
    console.log(`Duración de ${result.title} ha sido cambiada a : ${result.duration}`);
    return Recipe.deleteOne({ title:'Carrot Cake'})
  })
  .then( () => console.log('Receta eliminada!'))
  .catch( err => console.log(err) )
  .finally( () => mongoose.connection.close().then())
})




  
