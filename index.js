const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
//const MONGODB_URI = 'mongodb://localhost:27017/lab-mongoose-recipes';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// Recipe.insertMany(
//     data
// ).then(recipe => {
//     console.log(recipe);
// })
Recipe.findOneAndUpdate(
  {title:"Rigatoni alla Genovese"},{duration: 100}
).then(update => {
  console.log(update);
}).catch(err => console.log(err))

Recipe.deleteOne({title: "Carrot Cake"})
.then(deleted => console.log(deleted))
.catch(err => console.log("error: ",err))