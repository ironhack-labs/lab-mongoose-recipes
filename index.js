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
    // Iteration 2 - Create a recipe
  //   Recipe.create({ title: 'Banana Bread', 
  //   dishType: 'dessert', 
  //   creator: 'Sally McKenney', 
  //   image: 'banana bread', 
  //   level: 'Easy Peasy',
  //   cuisine: 'American', 
  //   ingridients: ['3 bananas', '2 cups of flour', '2 eggs', '1/2 cup butter at room temp', '3/4 cup brown sugar', '1/4 tsp salt', '1/2 tsp geounf cinnamon', '1/3 cup yogurt', '1 tsp baking soda' ]
  // })
  //   .then(recipe => console.log(recipe))
  //   .catch(err => console.log(err))
    
  // Iteration 3 - Insert multiple recipes
    Recipe.insertMany(data).then(recipes => {
      //console.log(recipes);
    })
  //   Recipe.find({}).sort({title: 1, _id: 0}).then(recipes => {
  //   console.log((recipes).{title});
  // });

  //Iteration 4 - update recipe
    Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: '100'})
    .then(update => console.log('Updated the recipe successfully'))
  
  //Iteration 5 - delete recipe
  Recipe.deleteOne({title: 'Carrot Cake'})
  .then(update => console.log('deleted the recipe successfully'))


  .catch(error => {

    console.error('Error connecting to the database', error)
  })

});