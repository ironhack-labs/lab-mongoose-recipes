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
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({ title: 'Pancakes', cuisine: 'French' });
    Recipe.find({ title: 'Pancakes' }).then((title) => {
      console.log(title);

      Recipe.insertMany(data).then((title) => {
        title.forEach((recipe) => console.log(recipe.title));
        // console.log(title)

        let updatePromise = Recipe.findOneAndUpdate(
          { title: 'Rigatoni alla Genovese' },
          { duration: 100 }
        ).then(() => {});

        let deletePromise = Recipe.deleteOne({
          title: 'Carrot Cake',
        }).then(() => {});

        Promise.all([updatePromise, deletePromise]).then(() => {
          mongoose.connection.close();
        });
      });
    });

    // Run your code here, after you have insured that the connection was made
  })

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
