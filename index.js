const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//console.log(Recipe.prototype)

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
    // Run your code here, after you have insured that the connection was made

    // Iteration-2
    // Recipe.create(data[0])
    //   .then(recipe => console.log(recipe.title))
    //   .catch(err => console.error('error in iteration-2', err))
    //Iteration-3
    Recipe.insertMany(data)
      .then(coll => coll.forEach(x => console.log(x.title)))
      .catch(err => console.error('error in iteration-3', err))
      .then(() => {
        //Iteration-4
        Recipe.findOneAndUpdate(
          {title: 'Rigatoni alla Genovese'},
          {duration: 100},
          {new: true}
        )
        .then(updated => console.log(updated))
        .catch(err => console.error('error in iteration-4', err))
        .then(() => {
          //Iteration-5
          Recipe.deleteOne(
            {title: 'Carrot Cake'}
          )
          .then(deleted => console.log(deleted))
          .catch(err => console.error('error in iteration-5', err))
        })
      })    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
