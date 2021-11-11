const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI =
  'mongodb+srv://pilauria:CtbSHUys2yPQlyxW@cluster0.q3aua.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-12yrdj-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  //ensures that the indexes defined in model's schema line up with the indexes in MongoDB collection.
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const pastaPomodoro = {
      title: 'pasta pomodoro',
      level: 'Easy Peasy',
      ingredientes: ['Maccheroni', 'Tomato', 'Water', 'Oil', 'Salt'],
      cuisine: 'Italian',
      dishType: 'main_course',
      image:
        'https://www.pexels.com/photo/delicious-spaghetti-with-bolognese-sauce-and-parmesan-cheese-7218637/',
      duration: 15,
      creator: 'Pietro Lauria',
      created: 10 / 11 / 2021,
    };
    console.log(pastaPomodoro);
    return Recipe.create(pastaPomodoro);
  })
  .then(() => Recipe.insertMany(data))
  .then(allrecipes => console.log(`allrecipes: ${allrecipes}`))
  .then(() =>
    Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    )
  )
  .then(() => console.log('Rigatoni alla genovese updated!'))
  .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
  .then(() => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
