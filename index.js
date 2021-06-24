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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({title: "Scrambled Eggs", cuisine: "International"})
  })
  .then((res)  => {
    console.log(res.title);
    return Recipe.insertMany(data);
  })
  .then((result) => {
    result.forEach((elem)=>{
    console.log(elem.title);
    });
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true});
  })
  .then(() => {
    console.log("Duration updated!");
    return Recipe.deleteOne({title: "Carrot Cake"});
  })
  .then(() => {
    console.log("Carrot cake successfully deleted!");
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Mongoose connection disconnected');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
