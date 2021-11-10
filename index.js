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
  .then(() => {Recipe.create([{
    title: 'Churrata',
    level: 'Easy Peasy',
    ingredients: [
      '500grm churros',
      '4 huevos',
      'patata',
      'cebolla'],
    cuisine: 'Spanish',
    dishType: 'breakfast',
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 40,
    creator: 'Jesús Sánchez Diezma',
  }])
    // Run your code here, after you have insured that the connection was made
  })
  .then((newRecipe => console.log (newRecipe)))
  .then(()=> Recipe.create(data))
  .then((newRecipe) => newRecipe.forEach(elm => console.log(elm.title)))
  .then(()=> Recipe.findOneAndUpdate({duration: 220}, {duration:100}))
  .then(()=>(console.log('Recetita creada')))
  .then(()=> Recipe.deleteOne({ title:'Carrot Cake' }))
  .then(()=>(console.log('Recetita eliminada')))
  .then(()=> mongoose.connection.close())
  .then(()=>(console.log('Venga un besi')))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
