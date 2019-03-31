mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/mongoose-models';

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
    .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
    .catch(error => console.info(`An error ocurred trying to connect to the database ${MONGODB_URI}`,error))