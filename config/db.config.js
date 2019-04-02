const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/lab-mongoose-recipes'


 mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
  .then(() => console.info(`Se ha conectado ${MONGODB_URI}`))
  .catch(error => console.error(`Error ${MONGODB_URI}`, error))
