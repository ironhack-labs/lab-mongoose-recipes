const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

require('./configs/db.config.js')

  const carbonara = {
    title: 'Carbonara',
    level: 'Easy Peasy',
    ingridients: [
      'pasta',
      'huevos',
      'pecorino',
      'pancetta'
    ],
    cuisine: 'Italian',
    dishType: 'Dish',
    image: 'https://www.informacibo.it/wp-content/uploads/2018/04/carbonara.jpg',
    duration: 20,
    creator: 'Chef Gualandi',
  }

  //Recipe.collection.drop();


  Recipe.create(carbonara)
    .then(recipe => { 
      console.log('Second iteration.')
      console.log('The recipe is saved and its title is: ',recipe.title) 
      return Recipe.insertMany(data)
    })
    .catch(err => { 
      console.log('An error happened:', err) 
    })
    .then(recipes => {
      console.log(`Third iteration. Those are the new recipes added:`)
      recipes.forEach(recipe => {
        console.log(recipe.title)
      })
      return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
    })
    .catch(err => {
      console.log('An error happened after creating the new recipes:', err)
    })
    .then( () => {
      console.log(`Fourth iteration. Succesfully updated!`)
      return Recipe.deleteOne({title: 'Carrot Cake'})
    })
    .catch(err => {
      console.log('An error happened after updating Rigatoni alla Genovese:', err)
    })
    .then(() => {
      console.log(`Fifth iteration. Successfully removed`)
    })
    .catch((err) => {
      console.log('An error happened after updating Rigatoni alla Genovese:', err)
    })
    .then(() => {
      console.log(`The database is closing...`)
      return mongoose.connection.dropDatabase()
    })
    .catch(err => {
      console.log(`Error while closing the data base`, err)
    })
    .then(() => {
      console.log(`the DB was successfully closed. Bye!`)
      return mongoose.connection.close()
    })
    .catch(err => {
      console.log(`Can't close the DB:`, err)
    })