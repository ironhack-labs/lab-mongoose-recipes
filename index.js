const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost/recipe-app';

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
  })
  Recipe.create({    
    title: 'Lasgne',
    level: 'Easy Peasy',
    ingredients: ['Hackfleisch', 'Tomaten', 'Zwiebel(n)'],
    cuisine: 'Italien',
    dishType: 'main_course',
    image: 'https://img.chefkoch-cdn.de/rezepte/745721177147257/bilder/668335/crop-600x400/lasagne.jpg',
    duration: 60,
    creator: 'Chef Italino',
    created: '2020-11-11'
  })

  .then(theNewRecipeCreated => {
    console.log('The new recipe is:', theNewRecipeCreated.title)
    return Recipe.insertMany(data)     
  })

  .then(theNewsRecipesInsert => {
    theNewsRecipesInsert.forEach(elm => console.log('The news recipes are:', elm.title))
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })     
  })

  .then(theRecipeUpdate => {
    console.log('The recipe that has been updated is:', theRecipeUpdate.title)
    return Recipe.deleteOne({ title: 'Carrot Cake' })    
  })


  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
