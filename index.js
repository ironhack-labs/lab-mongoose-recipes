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
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Ramsay's recipe",
      level: 'UltraPro Chef',
      ingredients: ['abc', 'def'],
      cuisine: 'italian',
      dishType: 'main_course',
      image: '',
      duration: 1000,
      creator: 'Chef Ramsay',
      created: '',
    })
      .then(newRecipe => {
        console.log(`New recipe added: ${newRecipe.title}`)
      })
      
      .catch(error => {
        console.error(`Error creating recipe: ${error}`)
      });
    
    Recipe.insertMany(data, function (error, recipes) {
      console.log(
        recipes.forEach((dataTitle) => console.log(`Created new recipe: ${dataTitle.title}`))
      );
    });

    Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese', duration:100, new:true})
      .then(update => {
        console.log(`Recipe updated`)
      })

    Recipe.deleteOne({title:'Carrot Cake'})
      .then(removed => {
        console.log(`Recipe removed`)
        mongoose.connection.close(() => {
          console.log('Mongoose default connection closed')
        })
      })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })