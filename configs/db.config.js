const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipe-app'

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.info(`Connected to the database: "${MONGODB_URI}"`))
  .catch((error) => console.error('Error connecting to the database', error));
  