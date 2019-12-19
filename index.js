const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  // Recipe.create({title: 'Bolinho de bacalhau3', level: 'Amateur Chef',ingredients: ['Bacalhau','Farinha','Ovo'],cuisine:'Portuguesa',dishType:'Snack', 
  // image: 'https://images.media-allrecipes.com/images/75131.jpg', duration: 30, creator: 'Vini e Fabio'})
  //   .then(recipe => { console.log(`The recipe is saved and its value is:${title}`) })
  //   .catch(err => { console.log('An error happened:', err) });

  //   console.log(Recipe)

  // Recipe.insertMany(data)
  //   .then(recipe => { console.log(`The recipe is saved and its value is:${title}`) })
  //   .catch(err => { console.log('An error happened:', err) });

    // console.log(Recipe)

    // Recipe.findByIdAndUpdate("5dfbb389c5f82e536f005f95",{duration: 100})
    // .then(recipe => { console.log(`The document  has been updated is saved and its value is:${duration}`) })
    // .catch(err => { console.log('An error happened:', err) });

    // Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:100})
    // .then(recipe => { console.log(`The document  has been updated is saved and its value is:${duration}`) })
    // .catch(err => { console.log('An error happened:', err) });

    // Recipe.deleteOne({ title: 'Carrot Cake' })
    // .then(recipe => { console.log(`The recipe is deleted`) })
    // .catch(err => { console.log('An error happened:', err) });

    mongoose.connection.close()
    // .then(recipe => { console.log(`Closed`) })
    // .catch(err => { console.log('An error happened:', err) });
