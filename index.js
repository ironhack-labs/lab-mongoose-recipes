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
    //seed
    Recipe.insertMany(data)

      .then(response => {
        console.log(response.length)
        //update
        Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
          .then(response => {
            console.log('Changed!')

          })
          .catch(err => {
            console.log('Error!!')
          })
        //delete
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(response => {

            console.log('deleted')
            // close
            mongoose.connection.close(() => {

              console.log('closed')

            })
          })
          .catch(err => {
            console.log('error delete!')

          })
      })

      .catch(err => {
        console.log("seeding is not working")
      })





    // let newRecipe = {
    //   title: 'ice cream',
    //   level: 'Easy Peasy',
    //   ingredients: ['pão francês', 'queijo', 'presunto'],
    //   cuisine: 'Brasileira',
    //   dishType: 'snack',
    //   image:
    //     'http://culinaria.culturamix.com/blog/wp-content/gallery/misto-quente-3/Misto-Quente-6.jpg',
    //   duration: 5,
    //   creator: 'JOC'
    // };
    // Recipe.create(newRecipe)
    //   .then(response => {
    //     console.log(response)
    //     mongoose.connection.close()
    //   })
    //   .catch(err => {
    //     console.log("error!!!!")
    //   })
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
