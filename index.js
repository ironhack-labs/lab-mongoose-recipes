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
    useFindAndModify: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: 'Banana Bread',
      level: 'Easy Peasy',
      ingredients: ['Bananas', 'Sugar', 'Chocolate Chips', 'Eggs', 'flour'],
      cuisine: 'American cuisine',
      dishType: 'dessert',
      duration: 2,
      creator: 'Natalia Fernández'
    })

      .then(res => { console.log("El nombre de mi receta es",res.title) })

  })

  .then(() => {
   return Recipe.insertMany(data)

      .then(recipes => {
        recipes.forEach(elm => console.log("El nombre de todas las recetas es", elm.title))
      })
    
  })

  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: "100" })
      
      .then(() => console.log("success updating!"))
    
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => console.log("success deleting!"))
    
  })

  .then(() => {
    return mongoose.connection.close(() => {
      console.log("success closing database!")
    })
  })

.catch(error => {
console.error('Error connecting to the database', error);
});

