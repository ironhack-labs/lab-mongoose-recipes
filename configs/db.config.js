const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/lab-mongoose-recipes'


mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
  .then(() => console.info(`Se ha conectado correctamente a la base de datos ${MONGODB_URI}`))
  .catch(error => console.error(`Ha habido un error al conectarse con la base de datos ${MONGODB_URI}`, error))




 // mongoose.connect('mongodb://localhost/recipeApp')
  //.then(() => {
    //console.log('Connected to Mongo!');
  //}).catch(err => {
    //console.error('Error connecting to mongo', err);
  //});