const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'



// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    Recipe.collection.drop()
      .then(() => {

        Recipe.create({
          title: 'Asian Glazed Chicken Thighs',
          level: 'Amateur Chef',
          ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
          cuisine: 'Asian',
          dishType: 'Dish',
          image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
          duration: 40,
          creator: 'Chef LePapu'
        })

          .then(newRecipe => {
            console.log('El titulo de la receta es:', newRecipe)
            Recipe.find({})
              .then(allTheRecipes => {
                allTheRecipes.forEach(recipe => recipe.title)
                Recipe.insertMany(data)
                  .then(allNewRecipes => {
                    console.log("Estas son las nuevas recetas:", allNewRecipes)

                    Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { $inc: { duration: 100 } })
                      .then(recipeResults => {
                        console.log('Los resultados de la actualización son:', recipeResults)
                        Recipe.deleteOne({ title: 'Carrot Cake' })
                          .then(recipeDelete => {
                            console.log('la receta borrada ha sido:', recipeDelete)
                            mongoose.connection.close()
                              .then(cierre => { console.log("He cerrado"), cierre })
                          })
                      })
                  })
              })
          })


      })
  }).catch(err => {
    console.error('Error connecting to mongo', err);

    // mongoose.connection.on('disconnected', () => console.log('Mongoose se ha desconectado'))
  });

