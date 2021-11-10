const mongoose = require('mongoose')

const databaseName = 'Recipes'
const connectionString = `mongodb://localhost/${databaseName}`

mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(connectionInfo => console.log(`Connected to Mongo! Database name: "${connectionInfo.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))