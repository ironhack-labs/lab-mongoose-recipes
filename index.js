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
  .then(() => {
    Recipe.create({title: 'Bolognese', level: 'Easy Peasy', cuisine: 'Italian', creator: 'Willem Prins'})
    .then(newRecipe => console.log(`New recipe: ${newRecipe.title}`))                                    
    .catch(err => console.log(`Failed: ${err}`));                                                          

    Recipe.create(data)
    .then(newRecipes => newRecipes.forEach(item => console.log(`New recipe created: ${item.title}`)))
    .then(() => {
      Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {$set: {duration: 100}}, {new:true})
      .then((updatedRecipe) => console.log(`Succes! ${updatedRecipe.title} updated.`))
      .catch(err => console.log(`Update failed: ${err}`));

      Recipe.deleteOne({title: 'Carrot Cake'})
      .then(() => console.log(`Sucesfully deleted recipe.`))
      .catch(err => console.log(`Could not delete recipe: ${err}`))
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  setTimeout(() => {
    mongoose.connection.close()
  }, 2000);

  // I honestly could not figure out how to properly, so I just used a timeout function. 
  // Also, I thought .then chaining would work but it didn't. Can we get a refresher on this in class?