const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI)
    .then(x => {
        console.log(`Connected to the database: "${x.connection.name}"`)
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany()
    })
    .then(() => {
        // Run your code here, after you have insured that the connection was made
        const body = {
            title: 'Mi Receta',
            level: 'Amateur Chef',
            ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey'],
            cuisine: 'Asian',
            dishType: 'main_course',
            image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
            duration: 40,
            creator: 'Chef LePapu',
        }

        const newRecipe = new Recipe(body)
        newRecipe
            .save()
            .then(recipe => {
                console.log(recipe.title)
            })
            .catch(err => {
                console.log(err)
            })

        Recipe.insertMany(data)
            .then(recipe => console.log(recipe.title))
            .then(() => {
                const recip = { title: 'Rigatoni alla Genovese' }
                const update = { duration: 100 }
                Recipe.findOneAndUpdate(recip, update)
                    .then(recipe => console.log(`Actualizado con exito ${recipe}`))
                    .then(() => {
                        Recipe.deleteOne({ title: 'Carrot Cake' })
                            .then(e => console.log(`Eliminado Con exito`))
                            .then(() => {
                                mongoose.connection.close(function () {
                                    console.log('Mongoose disconnected on app termination')
                                    process.exit(0)
                                })
                            })
                            .catch(e => console.log(e))
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    })

    .catch(error => {
        console.error('Error connecting to the database', error)
    })
