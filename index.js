require('dotenv').config();
const mongoose = require('mongoose');


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');


const MONGODB_URI = process.env.MONGO_URI;
console.log(process.env.MONGO_URI);



// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.insertMany(data);
    // Run your code here, after you have insured that the connection was made
    
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
  })
  .then((recipe) => {
    console.log(`The ${recipe.title} has been updated`);
  })
  .then((deleted) => {
    return Recipe.deleteOne({ 
      title: "Carrot Cake"
    })
  })
  .then((deleted) => {
    console.log(`Oh oh! ${deleted.title} is no longer available`);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => mongoose.connection.close());

  //const show = async () => {
    //const recipe = await Recipe.find({}, { title: 1, _id: 0});
    //console.log(recipe);
  //};
  
  //show();

