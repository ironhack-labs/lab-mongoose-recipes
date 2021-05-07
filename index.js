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
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  // Recipe.create(data, (err, newRec) => {
  //   if(err){
  //     console.log(err);
  //   }
  //   console.log(newRec);
  // })
Recipe.insertMany(data).then((value) => {
  console.log(value);
}).catch(err => {
  console.log(err);
});

Recipe.updateOne({
  title: "Rigatoni alla Genovese"
}, {
  duration: 100
})
.then((catUpdated) => {
  console.log(catUpdated)
})
.catch(e => console.log(e))

Recipe.deleteOne({
  title: "Rigatoni alla Genovese"
})
.then((catDeleted) => {
  console.log(catDeleted);
  mongoose.connection.close();
})