const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');

    return Recipe.collection.drop()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  })
  .then(() => {
    return Recipe.create({
      title: "Ensalada",
      level: "Easy Peasy",
      ingredients: ["lechuga", "tomate", "cebolla", "aguacate"],
      cuisine: "mediterranea",
      dishType: "Dish",
      image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Festaticos.miarevista.es%2Fmedia%2Fcache%2F760x570_thumb%2Fuploads%2Fimages%2Frecipe%2F5d1de76b5bafe804b488438c%2Fensaladamediterranea-int.jpg&imgrefurl=https%3A%2F%2Fwww.miarevista.es%2Fcocina%2Fensaladas%2Freceta%2Fensalada-mediterranea&docid=nvw-7P35URIN-M&tbnid=q2uxNl1SCChOJM%3A&vet=10ahUKEwj0qMrmuuflAhW4AGMBHRcVALMQMwhSKAEwAQ..i&w=760&h=570&bih=638&biw=1366&q=ensalada%20mediterranea&ved=0ahUKEwj0qMrmuuflAhW4AGMBHRcVALMQMwhSKAEwAQ&iact=mrc&uact=8",
      duration: 60,
      creator: "chef estefania",
      created: ""
    })

  })
  .then(() => {
    return Recipe.insertMany(data)
      .then(recipesInserted => recipesInserted.forEach(recipe => console.log(recipe.title)))
      .catch(err => console.log(err))
  })
  .then(() => {
    return Recipe.findOneAndUpdate({
        title: "Rigatoni alla Genovese"
      }, {
        duration: 100
      }, {
        new: true
      })
      .then(recipeUpdate => console.log(recipeUpdate))
      .catch(err => console.log(err))
  })

  .then(() => {
    return Recipe.deleteOne({
        title: "Carrot Cake"
      })
      .then(recipeDelte => console.log(recipeDelte))
      .catch(err => console.log(err))
  })
  .then(() => {
    mongoose.disconnect()
      .then(() => console.log("disconnect"))
  })