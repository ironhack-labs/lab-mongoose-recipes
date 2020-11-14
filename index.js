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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Recipe.create(data[0]).then(recipe=>console.log(recipe.title))
    let allActions = Recipe.insertMany(data).then((result) => {
      result.forEach((recipe) => console.log(recipe.title));
      Recipe.findOneAndUpdate(
        { title: 'Rigatoni alla Genovese' },
        { duration: 100 }
      )
        .then((result) =>
          console.log(`You have successfully updated ${result.title}`)
        )
        .then(
          Recipe.deleteOne({ title: 'Carrot Cake' })
            .then(() => console.log('You successfully remove Carrot Cake'))
            .then( () => mongoose.connection.close().then(()=>console.log('closed successfully')).catch(err=>console.log(err)))
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
    });
    
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
