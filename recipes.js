require('./configs/db.config.js');

const mongoose = require('mongoose');
const data = require('./data.js');

const Recipe = require('./models/recipe.model')

Recipe.create(data[0])
  .then(data => console.info(data))
  .catch(error => console.error(error))

Recipe.insertMany([, ...data])
  .then(data => console.log("Success"))
  .then( () => {
    return Recipe.find({}, {title:1, _id: 0})
      .then(data => console.log(data))
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{$set: {duration:100}})
    .then(data => console.log('Perfect'))
  })
  .then (() => {
    return Recipe.remove({title:'Carrot Cake'})
    .then(data => console.log('Perfect'))
  })
  .catch(error => console.error(error))
  .then (() => {
    mongoose.connection.dropDatabase()
  })
  .then(() => {
    mongoose.connection.close()
  })
  .catch(error => console.error(error))





  