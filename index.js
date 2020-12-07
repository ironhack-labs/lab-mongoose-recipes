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

    // async function test(recipe) {
    //   const recipeData =  await Recipe.create(recipe) // data[0]
    // }

    // test(data[0])

    // const recipeData = Recipe.create(data[0])
    // console.log(recipeData.title)

    const recipeData = Recipe.insertMany(data)
    for (let i = 0; i<data.length; i++){
      console.log(data[i].title)
    }
    return recipeData
  })
  .then(() => {
    const filter = { 'title': 'Rigatoni alla Genovese' }
    const update = { 'duration': 100 }
    console.log('su duración actualizada es', data[3].duration)
    return Recipe.findOneAndUpdate(filter, update, {new:true})
  })
  .then((rigatoni) => {
    console.log('el plato es: ',rigatoni.title)
    console.log('su duración actualizada es', rigatoni.duration)
    return Recipe.deleteOne({"title": "Carrot Cake"})
  })
  .then((carrotCake) => {
    console.log('We managed to erase the Carrot Cake from the recipes!', carrotCake)
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




