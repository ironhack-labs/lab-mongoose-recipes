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


  //Iteration 2
  // Recipe.create(data[0])
  // .then(()=> {
  //   console.log(`It worked`);
  // })
  // .catch((err)=> {
  //   console.log(`It didn't work ${err}`);
  // })

  //Iteration 3
  // Recipe.insertMany(data)
  // .then((msg)=> {
  //   msg.forEach(el => {
  //     console.log(el.title);
  //   })
  //   console.log(`Inserted many values: ${data.length} `);
  // })
  // .catch((err)=> {
  //   console.log(`It didn't work ${err}`);
  // });


  //Iteration 4
  
  // Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  // .then((msg)=> {
  //   console.log(`Object updated! `, msg);
  // })
  // .catch((err)=> {
  //   console.log(`Something went wrong `, err);
  // });

  // Iteration 5
  // Recipe.deleteOne({ title: "Carrot Cake"})
  // .then((msg)=> {
  //   console.log(`Object updated! `, msg);
  // })
  // .catch((err)=> {
  //   console.log(`Something went wrong `, err);
  // });
