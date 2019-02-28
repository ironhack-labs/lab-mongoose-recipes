const mongoose = require('mongoose');
const data = require('./data');
const Recipe = require('./models/recipes')

mongoose.connect('mongodb://localhost/recipeApp')
        .then(() => {
            console.log('Connected to Mongo!');
        })
        .then(() => Recipe.create({ title: 'Paella', cuisine: "Spanish" })
            .then(recipe => { console.log('El registro se ha creado con éxito con este valor: ', recipe) })
            .catch(err => { console.log('No he creado na nuevo:', err) })
        )

        .then(() => Recipe.insertMany(data) //le pasamos solo 1 parámetro pues los otros son opcionales
            .then(recipe => { console.log('He volcado la info del array con éxito: ', recipe) })
            .catch(err => { console.log('El array se ha quedao por el camino:', err) })
        )    

        .then(() => Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
            .then(recipe => { console.log('hemos actualizado el tiempo de duration: ', recipe) })
            .catch(recipe => { console.log('no se ha actualizado el Rigatoni: ', recipe) })
        )

        .then(() => Recipe.remove( { title: { $eq: "Carrot Cake"} } )
            .then(recipe => { console.log('Hemos borrado la receta de la Carrot Cake ', recipe) })
            .catch(recipe => { console.log('La receta de la Carrot no se ha borrado: ', recipe) })
        )

        .then(() => {
          mongoose.disconnect()
          .then(()=> console.log("Mongo disconnected"))
        })
       

    .catch(err => {
        console.error('Error connecting to mongo', err);
    })

  