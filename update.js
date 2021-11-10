require('./db-connect.js')

// Model
const Recipe = require('./models/Recipe.model')


Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
.then(info => console.log("Los detalles de la modificación son:", info))
.catch(err => console.log('Hubo un error', err))

// .updateOne()
// Recibe query, actualiza el primer match
// Retorna objeto con detalles de la operación