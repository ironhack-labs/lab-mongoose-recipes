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
    // Iteration 2
    Recipe.create({
      title: 'Tortilla',
      level: 'Easy Peasy',
      ingredients: ['eggs', 'potatoes', 'onions'],
      cuisine: 'european',
      dishType: 'other',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 20,
      creator: 'Maria'
    })
      .then(recipe => {
        console.log(recipe.title)
    
        // Iteration 3
        Recipe.insertMany(data)
          .then((newRecipes) => {
            newRecipes.forEach((elm) => {
              console.log(elm.title);

              // Iteration 4
              Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
                .then((elm) => {
                  console.log('Updated succesfully!')

                  // Iteration 5
                  Recipe.deleteOne({ title: 'Carrot Cake' })
                    .then((recipe) => {
                      console.log('Success, Carrot Cake removed')


                    })
                    .catch(err => console.log("Error!", err))
                  
                })
                .catch(err => console.log("Error!", err))
              
            })
              .catch(err => console.log("Error!", err))
            
          })
          .catch(err => console.log("Error!", err))
        
      })
      // // Iteration 6
      // .then(() => {
      //   mongoose.connection.close(() => {
      //     console.log('Database is closed')
      //   })
      // })
        
        
        
        
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });