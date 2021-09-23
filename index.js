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
    return Recipe.deleteMany()
  })
  .then(async() => {
    // Run your code here, after you have insured that the connection was made
      await Recipe.insertMany(data)
      await Recipe

    Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100})
    .then((updated)=>{
      console.log("updatedRecipe")
      return updated;
    })
      Recipe.deleteOne({title:"Carrot Cake"})
      .then(console.log("deleted"))
       



return mongoose.connection.dropDatabase();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

