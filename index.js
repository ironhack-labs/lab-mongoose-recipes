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
  .then(() => {
      Recipe.create({
      title: 'Cheescake',
      level: 'Amateur Chef',
      ingredients: ['eggs', 'flour', 'cheese'],
      cuisine: 'French cuisine',
      dishType: 'dessert',
      image: 'https://i2.wp.com/www.sugarspunrun.com/wp-content/uploads/2019/01/Best-Cheesecake-Recipe-2-1-of-1-4.jpg',
      duration: 120,
      creator: 'Jorge Martín'
    })
      .then(thisRecipe => {
        console.log(`El título de la receta es ${thisRecipe.title}`)
      })
    
  })
  .then(() => {
    return Recipe
      .insertMany(data)
      .then(data => {
        data.forEach (elm =>
        console.log(`El título de la receta es ${elm.title}`))
      })
  })
  .then(() => {
    return Recipe
      .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
      .then(thisRecipe => {console.log(`Has actualizado la duración de la receta, ahora es de: ${thisRecipe.duration}`)})
  })
  .then(() => {
    return Recipe
      .deleteOne({ title: "Carrot Cake" })
      .then(info => console.log('La información de la eliminaciónes:', info))
  })

  .then(() => {
    return mongoose.connection.close(() => {
      console.log('Se ha cerrado la base de datos.')
    })
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

