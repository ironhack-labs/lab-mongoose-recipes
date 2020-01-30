const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error('Error connecting to mongo', err));

// // Recipe.create({
// //   title: 'soup',
// //   cuisine: 'deutsch'
// // })
//   .then(created => {
//     console.log(created);
//   })
//   .catch(error => console.log(error));

// Recipe.insertMany(data).then(inserted => {
//   console.log(inserted);
// }).catch(err => {
//     console.log(err);
//   });

// Recipe.findOneAndUpdate({ duration: 220 }, { duration: 100 }).then(updated => {
//   console.log(updated);
// }).catch(err => {
//     console.log(err);
//   });

Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(success => {
    console.log(success);

    mongoose.connection.close(() => {
      console.log('Connection closed');
    });
  })
  .catch(err => {
    console.log(err);
  });
