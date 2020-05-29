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
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    const myRecipe = new Recipe({
      title: 'Arroz con leche',
      level: 'Easy Peasy',
      cuisine: 'International',
      dishType: 'dessert'
    });
    await Recipe.create(myRecipe);
    await Recipe.insertMany(data);
    const dataFound = await Recipe.find({});
    console.log('List of recipes:');
    dataFound.forEach(oneRecipe => console.log(`-> Recipe title: ${oneRecipe.title}`));
    (async () => {
      const res = await Promise.all([
        Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}),
        Recipe.deleteOne({title: 'Carrot Cake'})
      ])
      console.log('Data updated & deleted')
      mongoose.connection.close()
    })();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
