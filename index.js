const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {

    Recipe.create({ title: 'Omelette', level: 'Easy Peasy', ingredients: ['eggs', 'potatoes', 'olive oil'], cuisine: 'Spanish', dishType: 'Dish', image: undefined, duration: 60, creator: 'Anthony y Teo', created: undefined })
      .then(recipe => {
        console.log(recipe.title, 'exito insertando')

        Recipe.insertMany(data)
          .then(() => {
            console.log('exito importando DB')

            Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
              .then(() => {
                console.log('Exito actualizando receta')

                Recipe.deleteOne({ title: 'Carrot Cake' })
                  .then(() => {
                    console.log('Exito Borrando')

                    mongoose.disconnect()
                      .then(() => console.log('disconnected'))
                      .catch(() => console.log('error disconnecting'))


                  })
                  .catch(() => console.log('error borrando'))


              })

              .catch(() => console.log('error actualizando'))
          })
          .catch(err => console.log('Error Insertando DB'))

      })
      .catch(err => console.log('Error creating recipe', err))
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });




