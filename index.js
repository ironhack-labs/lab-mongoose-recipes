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
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return self.connection.dropDatabase();
  })
  .then(() => {
    const myRecipe = { title: 'Lentejas' };
    Recipe.create(myRecipe)
      .then((recipe) => console.log(`The ${recipe.title} recipe is created`))
  })

  //insert data from JSON
  .then(() => Recipe.insertMany(data))
  .then(() => {
    data.forEach((el) => console.log(`${el.title} added`))
  })

  //update data
  .then(() =>
    Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  )
  .then((recipe) => console.log(`The ${recipe.title} recipe has been updated`))

  //delete
  .then(() =>
    Recipe.deleteOne({ title: 'Carrot Cake' }, function (err) { })
  )
  .then((recipe) => console.log(`The recipe has been deleted`))


  .then(() => {
    mongoose.connection.close(() => {
      console.log('Mongoose default disconnected');
      process.exit(0);
    });
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


