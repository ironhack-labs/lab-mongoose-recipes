const moongose = require('mongoose')

const MONGODB_URI = 'mongodb://localhost:27017/lab-mongoose-recipes'

moongose.connect(MONGODB_URI,{useNewUrlParser: true})
  .then(() => console.info(`Successfully connected to database ${MONGODB_URI}`))
  .catch(() => console.error(`An error occurred while trying to connect ${MONGODB_URI}`))