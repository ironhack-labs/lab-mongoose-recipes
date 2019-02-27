const mongoose = require('mongoose')
const Schema = mongoose.Schema
const data = require('./data.js')
    // Requerimos el modelo
const Recipe = require('./models/Recipe.js')

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Mongo!');
        console.log(data)
        return Recipe.collection.drop()

    })
    .then(() => {
        Recipe.create({
            title: 'Carrot Soup',
            level: 'Easy Peasy',
            ingredients: ['carrot', 'milk'],
            cuisine: 'french cuisine',
            dishType: 'Other',
            image: null,
            duration: 3,
            creator: 'Carlos',
            created: null
        })
    })
    .then(recipe => {
        console.log(`A new recipe has been saved: ${recipe}`)
        return Recipe.insertMany(data)
    })
    .then(recipe => {
        console.log(`A new recipe has been saved: ${recipe}`)
        return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    })
    .then(recipe => {
        console.log(`The recipe has been updated: ${recipe}`)
        return Recipe.deleteOne({ title: 'Carrot Cake' })
    })
    .then(recipe => {
        console.log(`The recipe has been deleted: ${recipe}`)
        mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    })
    .catch(err => { console.log('An error happened:', err) })