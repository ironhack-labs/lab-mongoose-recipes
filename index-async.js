const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

async function runCode() {
    try {
        await mongoose
            .connect(MONGODB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
        await Recipe.deleteMany()
  
  })
  /*.then(() => {
    // Run your code here, after you have insured that the connection was made
  const recipe1 = data[0];
  
  const prz = Recipe.create(recipe1);
  return prz;
  }) */
  .then((createdRecipe) => {
   // console.log('createdRecipe', createdRecipe); 

    const prz = Recipe.insertMany(data)
    return prz;
  })
  .then ((createdRecipies) => {
   console.log('createdRecipies', createdRecipies);

    const prz = Recipe.find({title: "Rigatoni alla Genovese"});
    return prz;
  })
  .then((foundRecipe) => {
    console.log('foundRecipe', foundRecipe);

    const prz = Recipe.findByIdAndUpdate(
      foundRecipe[0]._id, {duration: 220} 
    );
    return prz;
  })
  .then((updatedRecipe) => {
    console.log('updatedRecipe', updatedRecipe);

    const prz = Recipe.deleteOne({title: "Carrot Cake"});
    return prz;
  })
  .then((deletedRecipe) => {
    console.log('deletedRecipe', deletedRecipe);
    mongoose.connection.close();
  })
  .finally(() => {
    console.log('connection closed');
  })
  .catch(error => { 
    console.error('Error connecting to the database', error);
  });
