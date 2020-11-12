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
    // Run your code here, after you have insured that the connection was made

    // Iteration 2 - Create a Recipe
    const recipe1 = {
      title: "Chilli Crab",
      level: "UltraPro Chef",
      ingredients: [ "Crab", "Chilli Peppers", "Ginger", "Shallots", "Taucu", "Garlic" ],
      cuisine: "Singaporean",
      dishType: "main_course",
      image: "https://www.seriouseats.com/recipes/images/2013/02/20130224-242112-singapore-chili-crab-edit.jpg",
      duration: 30,
      creator: "‪Zafrullah Abdul",
      created: Date.now() ,
    }
    const pr = Recipe.create(recipe1, (err, result) => {
      if (err) console.log(err);
      else console.log(`Recipe for ${recipe1.title} was added to the Database`);
    });

    // Iteration 3 - Insert Multiple Recipes
    Recipe.insertMany(data)
      .then( (result) => {
        result.forEach( (entry) => 
        {console.log(`Recipe for ${entry.title} was added to the Database`)})
      })
      .catch( (err) => console.log( err ) );

    // Iteration 4: Update recipe

    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
    )
    .then( ( result ) => console.log(`Rigatoni alla Genovese was updated ` + result))
    .catch( ( err ) => console.log(err) );


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
