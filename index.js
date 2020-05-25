const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myRecipe = new Recipe({//create a new recipe
  title: "Pão de Queijo",
  level: "Easy Peasy",
  ingredients: ["250g cheese", "1 1/2 egg", "300ml milk", "10g salt", "75ml oil, 250g Polvilho Doce", "250g Polvilho Azedo"],
  cuisine: "Mineira",
  dishType: "snack",
  image: "https://t1.rg.ltmcdn.com/pt/images/6/7/3/img_pao_de_queijo_de_liquidificador_376_orig.jpg",
  duration: 30,
  creator: "Marcela Vilas Boas",
})


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
    myRecipe
      .save()
      .then(newRecipe => console.log(`New recipe created: ${newRecipe.title}`))
      .catch(err => console.log(`Error creating the recipe: ${err}`))
  })
  .then(() => {
    Recipe.insertMany(data)
      .then(newdata => {
        newdata.forEach(element => {
          console.log(`Some new reciepes were added to the database: ${element.title}`)
        });
      })
      .catch(err => console.log(`Error while importing the reciepes: ${err}`))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
