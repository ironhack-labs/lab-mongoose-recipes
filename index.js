const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
console.log(data)
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
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: `Three chocolate cake`,
      level: `Amateur Chef`,
      ingredients: [`black chocolate`, `milk chocolate`, `white chocolate`, `cookies`, `butter`],
      cuisine: `International`,
      dishType: `dessert`,
      image: `https://www.google.com/search?q=tarta+tres+chocolates&sxsrf=ALeKk0078xoNWcTPfj4HYlZvG5MfdAIL3A:1611854409773&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjVmpjMkb_uAhViQkEAHcO-BeoQ_AUoAnoECAkQBA&biw=1920&bih=976#imgrc=t6HGkmOiZcp2WM`,
      duration: 45,
      creator: `Carlos and my beloved thermomix`,
      created:``
    })

    .then((recipe) =>{
      console.log(recipe.title)
    })

    .catch((error)=> {
      console.log(`error in ${error}` )
    })

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
