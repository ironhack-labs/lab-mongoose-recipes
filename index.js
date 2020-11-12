const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const tortillaPatatas = {
  title: "Tortilla de patatas",
  level: 'Easy Peasy',
  ingredients: "Eggs, Potatoes, Onion, Garlic, Olive oil",
  cuisine: "Spanish",
  dishType: "main_course",
  image: src = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.hogarmania.com%2Farchivos%2F201610%2Ftortilla-patatas-xl-668x400x80xX.jpg&imgrefurl=https%3A%2F%2Fwww.hogarmania.com%2Fcocina%2Frecetas%2Fhuevos%2Ftortilla-patatas-8684.html&tbnid=1NxohroUFA8TQM&vet=12ahUKEwj7xvOmvf3sAhVBYxoKHQJUBwYQMygFegUIARD0AQ..i&docid=Afmnufz5FIFPOM&w=668&h=400&q=tortilla%20de%20patatas&safe=off&ved=2ahUKEwj7xvOmvf3sAhVBYxoKHQJUBwYQMygFegUIARD0AQ',
  duration: 5,
  creator: 'Jamie'
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
    const createPromise = Recipe.create(tortillaPatatas)
    return createPromise
  })
  .then((createdRecipeDoc) => {
    console.log(createdRecipeDoc)
    const insertData = Recipe.insertMany(data)
    return insertData

  })

  .then(() => {
    const pr = Recipe.insertMany(data);
    data.forEach((recipe, i) => {
      console.log(i + 1, recipe.title);
    });
    return pr;
  })

  .then((createdRecipeDoc) => {
    Recipe.findOneAndUpdate({
      title: 'Rigatoni alla Genovese'
    }, {
      $set: {
        duration: 100
      }
    })
    console.log(`i've changed it`);

  })

  .then((createdRecipeDoc) => {
    Recipe.deleteOne({
      title: 'Carrot Cake'
    })
    console.log(`dont fuck with me and sergi`)

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


process.on('SIGINT', () => {

  mongoose.connection.close(() => {
    console.log('Mongoose says see you later suckers');
  })

})