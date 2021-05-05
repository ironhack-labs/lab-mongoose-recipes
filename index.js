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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    await Recipe.create({
      title: 'Fajitas',
      level: 'Amateur Chef',
      ingredients: ['Chicken', 'Peppers', 'Onions', 'Spices'],
      cuisine: 'Mexican',
      dishType: 'main_course',
      duration: 30,
      creator: 'Juanny'
    });
    
    await Recipe.insertMany(data);

    await Recipe.findOneAndUpdate(
      {title: 'Rigatoni alla Genovese'},
      {duration: 100}, {new: true}
    );

    await Recipe.deleteOne({title: 'Carrot Cake'});

    await Recipe.find()
      .then(each => {
        each.forEach(e => {
          console.log(e.title + ' : ' + e.duration);
        })
      });

    await mongoose.connection.close()

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
