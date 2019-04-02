const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/recipeApp'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.info(`Conectado a ${MONGODB_URI}`))
  .catch(error => console.error("cagadita", error))