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
    console.log(`Connected to the database: "${self.connection.name}"`)
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {

    // Iteration 2
    Recipe
    .create({
      "title": "Tarta de queso",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan)",
      ],
      "cuisine": "Española",
      "dishType": "dessert",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 35,
      "creator": "Manuel Carrillo"
    })
    .then(recipe => console.log(recipe))
    .catch(e => console.error(e))
  

    // Iteration 3
    Recipe
      .insertMany(data)
      .then(recipes => {
        recipes.forEach((recipe) => {
          console.log(`New recipe added: ${recipe.title}`)
        })
      })
      .catch(e => console.error(e))

    // Iteration 4
    Recipe
      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { runValidators: true, useFindAndModify: false })
      .then((recipe) => console.log('Successfully updated:'+ recipe))
      .catch(e => console.error(e))


    Recipe
      .deleteOne({ title: 'Carrot Cake' })
      .then(() => console.log('Successfully Deleted!'))
      .catch(e => console.error(e))


  })
  .catch(error => {
    console.error('Error connecting to the database', error)
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0)
    })
  })
