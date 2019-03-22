const mongoose = require("mongoose")
const Recipe = require("./models/recipes.js")
const data = require('./data.js');


mongoose.connect('mongodb://localhost/recipeApp')
    .then(() => {
        console.log('Connected to Mongo!');
    }).catch(err => {
        console.error('Error connecting to mongo', err);
    });

const asianGlazed = new Recipe(
    data[1])

// asianGlazed.save()
// .then(data => { console.log(data)}).catch(err => {console.log("something went wrong", err)})

//console.log(asianGlazed)

Recipe.insertMany(data)
    .then(data => { console.log(data) }).catch(err => { console.log("something went wrong", err) })

Recipe.updateOne({ title: "Asian Glazed Chicken Thighs" }, { duration: 100 })
    .then(duration => { console.log("The duration is updated:", duration) })
    .catch(err => { console.log('An error happened:', err) });

Recipe.deleteOne({ title: "Carrot Cake" })
    .then(successCallback)
    .catch(errorCallback);

mongoose.close() ///mongoose.disconnect(); also work and prefered
    .then(() => {
        console.log('You have disconnected from mongo ');
    })
    .catch(err => {
        console.error('Error connecting to mongo', err);
    });