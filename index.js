const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.set('useFindAndModify', false);

const insertRecipes = async (item) => await Recipe.create(item)
const insertMultipleRecipes = async (item) => await Recipe.insertMany(item)
const updateRecipe = async (item, update) => {
  const result = await Recipe.findOneAndUpdate(item, update)
  if (result) {
    return console.log(`Success recipe was updated! `)
  }
  return console.log(`Error update recipe! `)
}
const deleteRecipe = async (item) => {
  const { deletedCount } = await Recipe.deleteOne(item)
  if (deletedCount === 1) {
    return console.log(`Success recipe was deleted! `)
  }
  return console.log(`Error with delete recipe! `)

}


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(async () => {
    //data.map(doc => insertRecipes(doc))
    await insertMultipleRecipes(data)

    await updateRecipe({ title: "Rigatoni alla Genovese" }, { duration: 100 })

    await deleteRecipe({ title: 'Carrot Cake' })

    await mongoose.disconnect()

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })


