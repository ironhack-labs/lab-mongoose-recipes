const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// import Recipe from './models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');
const datasingle = require('./datasingle');

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
    return runMongooseInOrder();
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

async function runMongooseInOrder() {
  await Recipe.syncIndexes();
  // iteraction 2 - return error if using data[0] as data
  let create1 = await Recipe.create(datasingle);
  console.log('recipe created single:', create1.title);
  // iteraction 3
  let createMany = await Recipe.insertMany(data);
  createMany.forEach((recipe, i) =>
    console.log('created many:', i, recipe.title)
  );
  // iteraction 4
  let changed = await Recipe.findOneAndUpdate(
    { title: 'Rigatoni alla Genovese' },
    { duration: 100 },
    { useFindAndModify: false }
  );
  console.log('findOneAndUpdate done', changed.title, changed.duration);
  let datafound = await Recipe.findOne({ title: 'Carrot Cake' });
  console.log('findOne :', datafound.title);
  // iteraction 5
  await Recipe.deleteOne({ title: 'Carrot Cake' });
  console.log('deleteOne done');
  // iteraction 6
  return mongoose.connection.close();
}
