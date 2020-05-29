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
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .then(()=>{
    Recipe
      .create({ title: "Nardo" })
      .then((recipe) => {
        console.log('This is the recipe you were looking for', recipe.title)
      })
      .catch((error) => {
        console.log('error', error)
      })
  })
  .then(()=>{
    Recipe
      .insertMany(data)
      .then((recipe) => {
        return Recipe.find()
          .select('title')
          .then((theResponse) => {
            console.log(`These are the recipes that got added, ${theResponse}`)
          })
      })
      .catch((error) => {
        console.log('error', error)
      })
  })
  .then(()=>{
    Recipe
      .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then((recipe) => {
        console.log('You updated it succesfully', recipe)
      })
      .catch((error) => {
        console.log('An error with updating', error)
      })
  })
  .then(()=>{
    Recipe
      .deleteOne({ title: 'Carrot Cake' })
      .then((recipe) => {
        console.log('You deleted it succesfully', recipe)
      })
      .catch((error) => {
        console.log('An error with deleting', error)
      })
  })
  // .then(() => {
  //   mongoose.connection.close()
  // })
  // .then(() => console.log("Database closed"))
  // .catch((err) => {
  //   console.error('Error connecting to mongo', err);
  // });


const createNewRecipe = () =>{
  Recipe
    .create({ title: "Nardo" })
    .then((recipe) => {
      console.log('This is the recipe you were looking for', recipe.title)
    })
    .catch((error) => {
      console.log('error', error)
    })
}

const insertRecipesFromData = (data) => {
  Recipe
    .insertMany(data)
    .then((recipe) => {
      return Recipe.find()
        .select('title')
        .then((theResponse) => {
          console.log(`These are the recipes that got added, ${theResponse}`)
        })
    })
    .catch((error) => {
      console.log('error', error)
    })
}

const updateTheValues = () =>{
  Recipe
    .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
    .then((recipe) => {
      console.log('You updated it succesfully', recipe)
    })
    .catch((error) => {
      console.log('An error with updating', error)
    })
}

const deleteTheCarrot = () => {
  Recipe
    .deleteOne({ title: 'Carrot Cake' })
    .then((recipe) => {
      console.log('You deleted it succesfully', recipe)
    })
    .catch((error) => {
      console.log('An error with deleting', error)
    })
}