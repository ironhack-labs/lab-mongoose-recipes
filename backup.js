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

    const newRecipe = { title: 'Soup', level: 'Easy Peasy', ingredients: ['water', 'veggies'], cusine: 'Portuguese', creator: 'VOL'}
    Recipe.create(newRecipe)
    .then(newRecipe => {
       console.log(
        newRecipe.title
      )
    } 
  )
  

//const dataToImport = require('./data.json'); // SEE LINE 6 
Recipe.insertMany(data)
.then(data => {
  console.log(data.forEach.title)
})

const filter = { title: 'Rigatoni alla Genovese'};
const update = { duration: 100}
Recipe.findOneAndUpdate(filter, update)
.then(
  console.log('Success')
)

Recipe.deleteOne ({ title: 'Carrot Cake'})
.then(
  console.log('No more Carrot Cake');
// close the connection
mongoose.connection.close(()=>{
  console.log('Mongoose closing')
})


 


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
