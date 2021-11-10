const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title : "Evil Tests with TA garnish",
      level : "UltraPro Chef",
      ingredients : ["suffering", "patience", "god pls help me", "crying", "extra crying", "a liitle more crying", "oh look, more crying", "poison"],
      cuisine : "from hell",
      dishType : "snack",
      image : "",
      duration : 0,
      creator : "Big Bang Teo",
      created : Date.now(),
    
    })
  })
  .then(() => {
    return Recipe.insertMany(data)
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
    .then(info => console.log('Success killing the pie', info))
    .catch(err => console.log('The pie is still alive', err))

  })
  .then(() => {
    mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


