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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });




const newRecipe = {
  title: 'miXto quente',
  level: 'Easy Peasy',
  ingredients: ['pão francês', 'queijo', 'presunto'],
  cuisine: 'Brasileira',
  dishType: 'snack',
  image: 'http://culinaria.culturamix.com/blog/wp-content/gallery/misto-quente-3/Misto-Quente-6.jpg',
  duration: 5,
  creator: 'JOC'
};


// createRecipe.then(newRecipe => console.log("title: ", newRecipe.title))

Recipe.deleteMany()
  .then(response => {
    console.log(`Deleted ${response.deletedCount} elements`)
    Recipe.create(newRecipe)
      .then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log('not creating one recipe')
      });
    Recipe.insertMany(data)
      .then(response => {
        console.log(`Created ${response.length} elements`);
      })
      .then((result) => {
        Recipe.findOneAndUpdate({
            title: "Rigatoni alla Genovese"
          }, {
            duration: 100
          }, {
            new: true
          })
          .then(document => console.log("Success"))
          .catch(error => console.log("Update error: ", error))
        Recipe.deleteOne({
            title: "Carrot Cake"
          })
          .then(document => {
            console.log("Deleted carrot cake");
            mongoose.connection.close()
          })
          .catch(error => console.log("Update error: ", error))

      }).catch((err) => {

      });
  })



  .catch(err => console.log(`An error occurred seeding the DB: ${err}`))