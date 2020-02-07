const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

// Create recipe with model

let recipeDessert115 = {
  title: 'Vegan Chocolate Mousse',
  level: 'Amateur Chef',
  ingredients: ['200 gr dark chocolate', '100 gr cane sugar', '150 ml aquafaba', 'spoonful of lemon juice'],
  cuisine: 'Vegan',
  dishType: 'Dessert',
  image: 'https://foodimentaryguy.files.wordpress.com/2012/04/chocolatemousse.jpg',
  duration: 30,
  creator: 'Hope Green',
  created: 2019-10-05
};

Recipe.create(recipeDessert115)
  .then((result) => {
    console.log('Created a document', result);
    
  }).catch((err) => {
    console.log(err);
  });
  
Recipe.insertMany(data)
.then(result => {
  console.log('Inserted documents', result.length)
})
.catch(err => {
  console.log(err);
});

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: '100' })
  .then(result => {
    console.log("The information has been updated.");
  })
  .catch(err => {
    console.log(err);
  });

Recipe.deleteOne({ title: 'Carrot Cake'})
  .then(result => {
      console.log("The data has been deleted.");
    })
    .catch(err => {
      console.log(err);
    });

  // After last .then in the sequence, add mongoose.connection.close();
  // the last .catch(err => ) etc. still has to be there, on the last line.