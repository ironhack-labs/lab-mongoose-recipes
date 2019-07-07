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



  // Recipe.create({ 
  //   title: "Chicken Parmasian",
  //   level: "Easy Peasy",
  //   ingredients: ["Chicken", "Parmasian Cheese", "Spaghetti", "Sauce"],
  //   cuisine: "Italian",
  //   dishType: "Dinner",
  //   image: "",
  //   duration: 40,
  //   creator: "Chef Larrubia",
  //   created: Date('2020-12-25'),})
  //   .then(user => { console.log('The user is saved and its value is: ', user) })
  //   .catch(err => { console.log('An error happened:', err) });


    // Recipe.insertMany(data)
    // .then((rcp) => {
    //   console.log("Added to the DB")
    //   data.forEach((rcp, index) =>{
    //     console.log(rcp[index].title);
    //   })
    // }).catch(err => {
    //   //console.error('Error connecting to mongo', err);
    // });

    // Recipe.findByIdAndUpdate('5d220342972ef047883bc9ad', {duration: 100})
    // .then(console.log("Field Updated"))
    // .catch(console.log("Error updating recipe"));


    // Recipe.deleteOne({title: "Carrot Cake"})
    // .then(console.log("Recipe Removed"))
    // .catch(console.log("Error removing Recipe"));


    // Not sure if this is how to close a connection
    // process.on('SIGINT', () => {
    //   mongoose.connection.close(() => {
    //     console.log('Mongoose default connection disconnected through app termination');
    //     process.exit(0);
    //   });
    // });
    

