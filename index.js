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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    const recipe1 = new Recipe({
      "title": "Lasagna Bolognesa",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 pasta",
        "1 tomato sauce",
        "2kg of meat",
        "1 1/4 cheese",
      ],
      "cuisine": "Italian",
      "dishType": "Dish",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 30,
      "creator": "Chef Gabriela & Pedro"
    })

    Recipe.create(data)
      .then(response => console.log(response))
      .catch(error => console.log(error))

    Recipe
      .create(recipe1)
      .then(response => {
        allTitles()
        console.log('Recipies added')
        Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, { duration: 100 })
          .then(response => console.log('duration updated'))
          .catch(error => console.log(error))
          Recipe.deleteOne({title:"Carrot Cake"}, err => {})
          .then(response => console.log('deleted successfully'))
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))

    const allTitles = () => {
      Recipe
        .find()
        .then(recipies => {
          let str = '';
          recipies.forEach((recipies, idx) => {
            str += `${idx + 1}: ${recipies.title} `
          })
          return console.log(str);
        })
        .catch(error => console.log(error))
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

