const mongoose = require('mongoose')

const dataBaseName = 'IronHack-Recipes'
const connectionString = `mongodb://localhost/${dataBaseName}`

mongoose
    .connect(connectionString)
    .then(connectionInfo => console.log(`Conected to Mongo! "${connectionInfo.connections[0].name}"`))
    .catch(err => console.error('Error connecting to Mongo', err))

