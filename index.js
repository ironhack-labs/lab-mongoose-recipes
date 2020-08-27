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
  async function masterFunction(){
    createRecipe()
    await
    addMany(data)
    await
    updateRecipe()
    await
    deleteRecipe()
    // iteration 6
    await
    mongoose.connection.close() 
  }
  masterFunction()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
  // iteration 2

  async function createRecipe(){
    const newRecipe = await Recipe.create({
      title: 'Empanadas de Piña',
      level: 'Easy Peasy',
      ingridients: ['Eggs', `Piña`, 'Flour'],
      cuisine: 'Mexican',
      dishType: 'dessert',
      image: 'https://i.pinimg.com/originals/83/77/7e/83777e59b8cd49f3da2fa4b225dc0700.png',
      duration: 30,
      creator: 'Maria Cantú'
    })
  }
  
  //iteration 3

  async function addMany(data){
    const dataRecipes = await Recipe.insertMany(data)
    dataRecipes.forEach(el => console.log(el.title))
  }

  //iteration 4

  async function updateRecipe(){
    const filter = {title: "Rigatoni alla Genovese"}
    const update = {duration: 100}
    const doc = await Recipe.findOneAndUpdate(filter, update, { new: true })
    console.log(doc)
  }

  //iteration 5

  async function deleteRecipe(){
    const filter = {title: "Carrot Cake"}
    const deletedRecipe = await Recipe.findOneAndRemove(filter)
    console.log('Success deleting recipe')
  }

