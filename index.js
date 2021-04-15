const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { model } = require('./models/Recipe.model');

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
    Recipe.create(data, (err, recipe) => {
      recipe.forEach(Element => {
        console.log(Element.title)
      })
    Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
    Recipe.deleteOne({title: "Carrot Cake"})
      .then(() => {console.log("updated")})
      .catch(() => {console.log("not updated")})
    })
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
  

  

  
