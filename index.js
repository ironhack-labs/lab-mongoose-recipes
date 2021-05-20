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
    
    // add one recipe
    const data = { title: 'Pasta with cheese', level: 'Easy Peasy', ingredients:['tomato', 'meat'], cuisine: 'indian',dishType:'main_course', duration: 1, creator: 'M. Issa'};
    Recipe.create(data)
    .then(recipe => console.log('The recipe is saved and its value is: ', recipe.title))
    .catch(error => console.log('An error happened while saving recipe:', error));

    // add many recipies to the db
    Recipe.insertMany(data)
    .then(recipe => console.log('The recipies have been saved', recipe))
    .catch(error => console.log('An error happened while saving recipies :', error));
    
    // update one recipe
    Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {$set: {duration: 100 }}, function(err, doc){
      if(err){
        console.log("Something wrong when updating data!");
      }
      console.log(doc)
    })

    // Delete one recipe
    Recipe.deleteOne({title: 'Carrot Cake'})
    .then(() => console.log("data deleted"))
    .catch(err => console.log(err))
    
  })
  // .then(() => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });