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
  .then(() => Recipe.syncIndexes())

  .then(() => {

  //   ITERATION 2. Create new recipe

    Recipe
    .create({
      title: 'IronBurgers', 
      level: 'UltraPro Chef', 
      ingredients: ['meat', 'bread', 'love'], 
      cuisine: 'spanish', 
      dishType: 'main_course', 
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
      duration: 1, 
      creator: 'Sara' 
      })

    .then(newRecipe => {
    console.log('The new recipe is', newRecipe.title)
    return Recipe.create(data)
    })

  // //  ITERATION 3. Insert multiple recipes

    .then(newRecipes => {
      newRecipes.map((recipe) => console.log('The title of the recipe added is', recipe.title))
      return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}, { new: true })
    }) 

  // //  ITERATION 4. Updating a recipe

    .then(updatedRecipe =>  {
      console.log('The recipe was updated succesfully!')
      return Recipe.deleteMany({title: 'Carrot Cake'})
    })

  // //  ITERATION 5. Remove a recipe

   .then(removedRecipe => {
     console.log('Success! The recipe was removed')
     return mongoose.connection.close()
   })
    
   .catch(err => console.log('Error at recipe update', err))

  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
