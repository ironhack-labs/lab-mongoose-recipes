const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data');  // Import of the data from './data.json'

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
    // return self.connection.dropDatabase();
  })
  .then(() => {
    //Iteration 2 - Create a recipe
        // return Recipe.create({
        //   title: 'Butternut Squash',
        //   level: 'Easy Peasy',
        //   ingredients: ['butternut squash', 'garlic', 'butter', 'olive oil','sal&pepper'],
        //   cuisine: 'American',
        //   dishType: 'soup',
        //   image: "https://cdn.pixabay.com/photo/2015/10/23/18/41/pumpkin-soup-1003488__340.jpg",
        //   duration: '45',
        //   creator: 'Kara',
        //   created: 12/11/2020
        // }).then(recipe => {
        //     console.log(`The name of this recipe is ${recipe.title}`);
        // }) 
    
    //Iteration 3 - Create many from data.json
      // Recipe.insertMany(data).then(recipe => {
      //   console.log(recipe.title)
      // })

//Movies.insertMany(arr, function(error, docs) {});

    //Iteration 4 - Update Rigatoni
    //   Recipe.findOneAndUpdate( {title:'Rigatoni alla Genovese'},{duration:100}).then(console.log('success'))
    // })

    //Iteration 5 - Delete Carrot Cake
    //   Recipe.deleteOne( {title:'Carrot Cake'} ).then(console.log('delete success'))
    // })

    // Iteration 6 - Disconnect 
      mongoose.disconnect()
    })
    
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
