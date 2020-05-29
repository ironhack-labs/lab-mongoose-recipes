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
    Recipe.create({
      title:"apple crumble", level : "easy",serve :"4" 

    }).then(recipes =>{
      console.log("myRecipe was added")
    }
  )
  .catch(error => {
    console.error('Error adding the Recipe', error);
  })

   .then(recipes =>{
      recipes.forEach(recipe =>{
        console.log(recipe.title)
    })

    Recipe.updateOne({title:'Rigatoni alla Genovese'}, {$set: {duration: 100}})
    .then((res)=>{
    console.log('Successfully Updated: ', res)

    Recipe.deleteOne({title:'Carrot Cake'})
    .then((res)=>{
      console.log('Successfully Deleted: ', res)
    })

    .catch((error)=>{
      console.log('Oups not deleted! ', error)
    })
      mongoose.disconnect()
  });