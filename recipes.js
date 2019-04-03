const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/recipeApp';

//const Schema   = mongoose.Schema;
//const data = require('./data.js');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then( () => console.info('Connected to Mongo!') )
  .catch( err => console.error('Error connecting to mongo', err) );


// Este fichero será ./conf/db.conf.js en un futuros proyectos