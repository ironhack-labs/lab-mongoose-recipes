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
  return Recipe.create({
    title: 'Arepa',
    level: 'Amateur Chef',
    ingredients: ['Precooked Corn Flour', 'Water', 'Salt'],
    cuisine: 'Venezuelan',
    dishType: 'other',
    image: 'https://d1kxxrc2vqy8oa.cloudfront.net/wp-content/uploads/2019/03/21104046/RFB-2003-4-arepademaizprecocido.jpg',
    duration: 5,
    creator: 'Robbie',
  })
  
}).then(recipe => console.log(recipe.title))

.then(() => {
  return Recipe.create(data)
  
})
.then((recipes) => recipes.forEach(obj => {
  console.log(obj.title)}))
  
  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' },
    { duration: 100 },
    { new: true })
    
  })
  .then(recipes => console.log(recipes.title))
  
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake'})
  })
  .then(recipes => console.log('deleted'))
  
  .then(() => {
    mongoose.connection.close()
    
  }) 
  .then(() => console.log('Closing Mongoose, VIVA LINUX'))
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  