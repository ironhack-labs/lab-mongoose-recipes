const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/mongoose-models';

mongoose.connect(MONGODB_URI)
    .then(() => console.info(`Conectado en ${MONGODB_URI}`))
    .catch(error => {console.error(`NO conectado en ${MONGODB_URI}`), error});