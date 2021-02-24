const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const myRecipe = {
  title: "Crèpes aux nutella",
  level: "Easy Peasy",
  ingredients: [
    "des crepes",
    "du Nutella",
    "en option : Chantilly"
  ],
  cuisine: "For the lazy",
  dishType: "snack",
  image: "https://media-cdn.tripadvisor.com/media/photo-s/0b/70/f2/ea/crepe-nutella.jpg",
  duration: 5,
  creator: "Popi"
};

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
    // Run your code here, after you have insured that the connection was made

    // Recipe.create(myRecipe, (error, recipe) => {
    //   if (error) {
    //     console.log('An error happened:', error);
    //   }
    //   console.log('This recipe is saved, the title is', recipe.title);
    // })

    // Recipe.create(data, (error, recipe) => {
    //   if (error) {
    //     console.log('An error happened:', error);
    //   }
    //   console.log('The recipes are saved');
    // })

    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    .catch(error => {
        console.log('An error happened:', error)
  })
    .then(() => {
      console.log('The recipe have been updated');
    })

  Recipe.deleteOne({title: "Carrot Cake"})
  .catch(error => {
      console.log('An error happened:', error)
})
  .then(() => {
    console.log('The recipe have been deleted');
  })

})

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
