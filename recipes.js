const mongoose = require('mongoose')
const Schema = mongoose.Schema
const data = require('./data.js')
const express = require('express')
const Recipe = require('./models/Recipe')

const app = express()

mongoose
    .connect('mongodb://localhost/recipeApp')
    .then(() => {
        console.log('Connected to Mongo!')
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    })

app.get('/recipe-app', (req, res) => {
    // Recipe.create({ title: 'Spaghetti' }).then(result => {
    //     console.log(result.title)
    //     res.send(result)
    // })
    // Recipe.insertMany(data).then(result => {
    //     res.send('done')
    // })
    // Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }).then(result => {
    //     res.send('Success!')
    // })
    Recipe.remove({ title: 'Carrot Cake' })
        .then(result => {
            res.send('Removed!')
        })
        .then(result => {
            mongoose.connection.close().then(console.log('closed'))
        })
        .catch(err => {
            console.log(err)
        })
})

app.listen(3000)
