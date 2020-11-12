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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


//MY CODE - TO INSERT IN SECOND "THEN" ONE BY ONE
const recipeApplePie = 
{
  title: 'apple pie',
  level: 'Easy Peasy',
  ingredients: [apples, water, sugar],
  cuisine: 'yes',
  dishType: 'dessert',
  image:'',
  duration: 20,
  creator: 'Andreu',
  created: ''
};

Recipe.create(recipeApplePie)
  .then((result)=>{`recipe created: ${result.title}`})
  .catch((error)=>{`error while creating ${error}`})


Recipe.insertMany(data)
  .then((result)=>{
    result.forEach(element => {
      console.log(`${result.title}`)
    });
  })
  .catch((error)=>{`error`})


Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then((result)=>{
    console.log(`successful update: ${result.duration}`)
  })
  .catch((error)=>{`error while update: ${result.duration}`})

  Recipe.deleteOne({title: 'Carrot cake'})
    .then(result=>console.log(`success delete: ${result}`))
    .catch(error=>console.log(`error while deleting ${error}`))


//CLOSING DATABASE
  mongoose.connection.close()
    .then(result=>console.log('conection close'))
    .catch(error=>console.log('error while closing database'))
  