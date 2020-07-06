const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const pizza = {
  title: 'Italian Pizza',
  level: 'Easy Peasy',
  ingredients: [ 'Dough', 'Tomatoes', 'Olives', 'Ham', 'Cheese' ],
  cuisine: 'italian',
  dishType: 'main_course',
  image: 'https://cdn.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.recetasdesbieta.com/wp-content/uploads/2018/09/Como-hacer-pizza-casera-rapida-con-masa-de-pizza-sin-repos-1-860x380.jpg',
  duration: 45,
  creator: 'Chef Mateo'
}

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
    Recipe.create(pizza)
    .then(newRecipe => console.log(`A new recipe is created: ${newRecipe.title}`))
    .then (() => Recipe.insertMany (data))
    .then (() => data.forEach(recipe => {console.log(`A new recipe is created: ${recipe.title}`)}))
    .then (() => Recipe.findOneAndUpdate({ title : 'Rigatoni alla Genovese' }, { duration : 100 }))
    .then(recipe => console.log(`Recipe updated: ${recipe.title}`))
    .then(() => Recipe.deleteOne( {title: 'Carrot Cake'} ))
    .then(() => console.log(`Recipe deleted`))
    .then(()=> {
      console.log('Database Exit')
      mongoose.connection.close()
      process.exit(0)
    })
    .catch(err => console.log(`Error while creating a new recipe: ${err}`))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
