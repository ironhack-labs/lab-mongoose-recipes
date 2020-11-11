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
    Recipe
    .create({title: 'Paella', level: 'Easy Peasy', ingredients: ['rice', 'water', 'rabbit'], cuisine: 'Spanish', dishType: 'breakfast', image:'https://www.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-m.jpg', duration: 5, creator: 'Popino'})
    .then(theNewDish => console.log('The new added recipe is: ', theNewDish.title))
    .catch(err => console.log('Error ceating the new registry: ', err))
    .then(() => {
      Recipe
      .insertMany(data)
      .then(recipes => recipes.forEach(e => (console.log('The titles of the new recipes are: ', e.title))))
      .catch(err => console.log('Error ceating the new registry: ', err))
      .then(() => {
        Recipe
        .findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
        .then(theupdatedDish => console.log('The new updated recipe duration: ', theupdatedDish.title))
        .catch(err => console.log('Error updating the registry: ', err))
        .then(() => {
          Recipe
          .deleteOne({title: "Carrot Cake"})
          .then(deletedItem => console.log('The deleted item is: ', deletedItem.title))
          .catch(err => console.log('Error deleting the registry: ', err))
          .then(() => {
            mongoose.connection.close()
            
          })
        })
      })
    })
  })
  
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
