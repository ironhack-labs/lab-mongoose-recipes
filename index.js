const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  // const recipe = { title: 'Lemon Pie', level :"Easy Peasy", ingredients : ["flour", "lemons","butter"], cuisine : "French"};
  // ITERATION 2
  // Mongoose allows us to use a callback pattern
  // to handle the completion of the asynchronous operation
  // Recipe.create(recipe, (error, user) => {
  //   if (error) {
  //     console.log('An error happened:', error);
  //     return;
  //   }
  //   console.log('The recipe is saved and its name is: ', recipe.title);
  // });


  // ITERATION 3

  Recipe.insertMany(data,(error, user) => {
    if (error) {
      console.log('An error happened:', error);
      return;
    }
    data.forEach(element => {
      console.log('The recipe is saved and its name is: ', element.title);
    });
  })

  // ITERATION 4
  // Recipe.findOneAndUpdate({title : "Rigatoni alla Genovese"}, {duration : 100},(error, doc) => {
  //   if (error) {
  //     console.log('An error happened:', error);
  //     return;
  //   }
  //   console.log("You just updated the duration!")
  // });

  // ITERATION 5
  Recipe.find({title:"Rigatoni alla Genovese"}, 'title')
    .then(recipe => {
      console.log(recipe.title)
    })
    .catch(error => {
      console.log('An error happened:', error);
      return;
    });
  

  