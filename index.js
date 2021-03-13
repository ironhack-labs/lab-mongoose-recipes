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
     const newRecipe = {
      title: 'Lasagna',
      level: 'Easy Peasy',
      ingredients: ['lasagna noodles', 'mozzarella cheese', 'ricotta cheese', 'tomato sauce', 'onion', 'garlic', 'salt'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 40,
      creator: 'Chef Kim'
    };

    Recipe.create(newRecipe)
    .then(() => {
        console.log(newRecipe.title)
    })
    .then(() => {
      Recipe.insertMany(data)
        .then((recipes) => {     
          recipes.forEach(element => {
            console.log(element.title)
          });
        })
        .then(() => {
          Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {$set: {duration: 100}}, {useFindAndModify: false})
            .then (() => {
              console.log('Updated Rigatoni')
            })
        })
        .then(() => {
          Recipe.deleteOne({title: 'Carrot Cake'})
            .then (() => {
              console.log('Carrot Cake deleted')
              mongoose.connection.close()  
            })
        })
    }) 
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
