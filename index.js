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
  .then(() => Recipe.syncIndexes())
  .then(() => {
  
  return Recipe.create({ 
    title: 'Tortilla',
    level: 'Amateur Chef', 
    ingredients: ['Batata', 'Egg'],
    cuisine: 'Spanish',
    dishType: 'main_course',
    duration: 20,
    creator: 'Spanish people',
    // })Run your code here, after you have insured that the connection was made
  })
  .then((recipe) => {
   console.log(recipe.title)
  })
  .then(() => {
    return Recipe.create(data)
  })
  .then((recipe) => recipe.forEach(elm => console.log(elm.title)))

  .then(()=>{
    return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration: 100})
  })

  .then(()=>{
    return Recipe.deleteOne({title:'Carrot Cake'})
  })
  .then(()=>{
    console.log('Lo he borrado!') // verificar si se ha cerrado
  })
  .then(()=>{
    return mongoose.connection.close()
  })
  .then(()=>{
    console.log('Ha ido todo bien') // verificar si se ha cerrado
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
})
