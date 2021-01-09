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

  //const Recipe = mongoose.model('recipes', recipeSchema)

  // Iteration 2

const recipe = new Recipe({
    title: "Pizza",
    level: "Easy Peasy",
    ingredients: ['cheese', 'tomatoe', 'jam'],
    cuisine: 'italian',
    dishType: 'main_course',
    image: 'https://images.media-allrecipes.com/images/75131.jpg',
    duration: 20,
    creator: 'Llorenc'
})

recipe.save()
.then(recipe => {
    console.log(`Recipe created ${recipe.title}`)
})
.catch(err => {
    console.error(err)
  
})


// Iteration 3
const promise1 = Recipe.insertMany([{ 
  title: "Spaguetties",
  level: "Easy Peasy",
  ingredients: ['cheese', 'tomatoe', 'jam'],
  cuisine: 'italian',
  dishType: 'main_course',
  image: 'https://images.media-allrecipes.com/images/75131.jpg',
  duration: 20,
  creator: 'Llorenc'
}, 
{
  title: " Rigatoni alla Genovese",
  level: "Easy Peasy",
  ingredients: ['cheese', 'tomatoe', 'jam'],
  cuisine: 'italian',
  dishType: 'main_course',
  image: 'https://images.media-allrecipes.com/images/75131.jpg',
  duration: 20,
  creator: 'Francesco'
}])
;

// Promise.all([promise1])
//   .then(values => {
//     console.log('students and cities have been inserted');
//     console.log(values);
//     mongoose.connection.close();
//   })
//   .catch(err => console.error(err));




  // Iteration 4

 const promise2 =  Recipe.updateOne({title:'Rigatoni alla Genovese'}, {duration: 100}) 

 Promise.all([promise1, promise2])
 .then(values => {
   console.log('students and cities have been inserted');
   console.log(values);
   mongoose.connection.close();
 })
 .catch(err => console.error(err));