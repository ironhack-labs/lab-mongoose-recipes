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
  /*.then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({ title: 'Castañas asadas', level: 'Easy Peasy', ingredients: ['chesnuts', 'chesnut wood', 'fire'], cuisine: "Spanish", dishType: "dessert", image: ' ', duration: 30, creator: "Chef Maricastaña" })
   .then(newRecipe => console.log('The new recipe is:', newRecipe))
   .catch(err => console.log('Bad recipe', err))
    
    
    Recipe.insertMany(data)
      .then(newRecipes => newRecipes.forEach(elm => { console.log(elm.title) }))
  })*/

  .then(() =>
    
    Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, {new: true})
  )

  .then(() =>
    Recipe.deleteOne({ title: 'Carrot Cake'})
  ) 
  
  .then(() => mongoose.disconnect(console.log('Exit!')))

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
