const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const spanishOmelette = {
  title: 'spanish Omelette',
  level: 'Easy Peasy',
  ingredients: ["4 eggs", "1 oignon", "1/2kg potatoes", "2 cups virgen oil", "salt", "200g goat cheese", "100gr green pepper"],
  cuisine: 'Spanish',
  dishType: 'main_course',
  image: 'https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2019/05/tortilla-espa%C3%B1ola.jpg',
  duration: 30,
  creator: 'Paco'
}

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
    // Run your code here, after you have insured that the connection was made
    Recipe.create(spanishOmelette)
      .then(newRecipe => console.log(`The recipe ${newRecipe.title} is saved`, newRecipe))
  })
  .then(() => {
    for (let i = 0; i < data.length; i++) {
      Recipe.insertMany([data[i]])
      console.log(`The recipe ${data[i].title} is saved`)
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//Update one recipe
Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  .then((updatedRecipe) => console.log(`The recipe ${updatedRecipe.title} has been successfully updated. The new duration is ${updatedRecipe.duration}`))
  .catch((err) => console.log(err));

//Delete one recipe
Recipe.deleteOne({ title: "Carrot Cake" })
  .then((deletedRecipe) => console.log(`The recipe Carrot Cake has been successfully removed`))
  .catch((err) => console.log(err));

  // mongoose.connection.close()