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
    useUnifiedTopology: true,
    useFindAndModify:false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    Recipe.deleteMany({})
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Recipe.create(data[0])
    //   .then(firstRecipe => console.log('The title of the fisrt recipe is: ', firstRecipe.title))
    //   .catch(error => console.log('An error happened while saving a new recipe:', error));

    Recipe.insertMany(data)
      .then(data.forEach( recipe => {
        console.log('The title of this recipe is: ', recipe.title)
       }))
      .catch(error => console.log('An error happened while saving a new recipe:', error))

  })

  .then(() => {
    Recipe.findOneAndUpdate({"title": "Rigatoni alla Genovese"}, {'duration': 1000} )
      .then(() => { 
        console.log("Data updated");
      }).catch( error => { 
        console.log(error); 
      });
  })

  .then(() => {
    Recipe.deleteOne({title: "Carrot Cake"})
      .then(() => { 
        console.log("Data deleted");
      }).catch( error => { 
        console.log(error); 
      });
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

