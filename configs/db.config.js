const mongoose = require('mongoose');
const DB_NAME = 'ex-recipes';
const MONGO_URI = `mongodb://localhost/${DB_NAME}`;

mongoose.connect(MONGO_URI)
.then(() => console.log(`connected to db: ${DB_NAME}`))
.catch(err=> next(err))

