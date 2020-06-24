const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)

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

    Recipe
      .create(
        {title: 'Pizza', level: 'Easy Peasy', cuisine: 'italian', ingredientes: ['Love', 'Phone'], dishType: 'main_course', 
        image: 'https://www.recetasdesbieta.com/wp-content/uploads/2018/09/Como-hacer-pizza-casera-rapida-con-masa-de-pizza-sin-repos-1.jpg', 
        duration: 2, creator: 'Elena'},
        )
      .then((recipe) => {
        console.log(recipe.title)
        return Recipe.create(data)}) //<---Es un Array!
      .then((recipeArr) => {
        recipeArr.forEach(recipe => console.log(recipe.title))
        return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})})
      .then(detalles => {console.log('Bien Elena! esta función te devuelve detais como estos:', detalles)
        
        return Recipe.deleteOne({title: 'Carrot Cake'})})
      .then (() => {console.log('the item has been removed successfully and it is now with Charini! :D')
        mongoose.connection.close()})
      .catch(error => console.log('Ha habido este error:', error))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


