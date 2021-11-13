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
  .then(async () => {
    // create a model inside database
    //const newRecipe= await Recipe.create({ title : 'Cozido à Portuguesa' , cuisine :" Portuguese"})
    //console.log( "Recipe:", newRecipe.title)

    const newRecipe= await Recipe.insertMany(data)

    newRecipe.map((recipe) => {
      console.log( "Recipe:", recipe.title )
    })


    const query = { title: 'Rigatoni alla Genovese' };
      
    await Recipe.findOneAndUpdate(query, { duration: 100 })
    console.log("update")

    const deleted = { title: 'Carrot Cake'};

    await Recipe.deleteOne(deleted);
        
    console.log("delete")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  }).then(() => {
    return mongoose.connection.close()
  }).then(() => {
    console.log("closed!")
  })



