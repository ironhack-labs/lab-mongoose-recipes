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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase(); //DELETE DATABASE
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    //Iteration 2 - Create a recipe
    const newRecipe = {
      title: 'Homemade Pizza',
      level: 'Amateur Chef',
      ingredients: ['1 package (1/4 ounce) active dry yeast', '1-1/4 cups warm water (110° to 115°)', '3-1/2 to 4 cups all-purpose flour', '1 can (15 ounces)tomato sauce'],
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmahatmarice.com%2Fwp-content%2Fuploads%2F2020%2F04%2FRice-Pizza-Crust.jpg&imgrefurl=https%3A%2F%2Fmahatmarice.com%2Fes%2Frecetas%2Fpizza-con-masa-de-arroz%2F&tbnid=as7xy4K9TxRXrM&vet=12ahUKEwjK_8_k8frsAhUV0eAKHTFQBncQMygEegUIARDMAQ..i&docid=tyXJx1wNrHCPnM&w=1620&h=1080&q=pizza%20foto&ved=2ahUKEwjK_8_k8frsAhUV0eAKHTFQBncQMygEegUIARDMAQ',
      duration: '160',
      creator: 'Chef Marisa'
    }
    return Recipe.create(newRecipe)
  })
  .then(newRecipe => {
    console.log('The new recipe is:', newRecipe.title)
    //Iteration 3 - Insert multiple recipes
    return Recipe.insertMany(data)
  })
  .then(arrayRecipes => arrayRecipes.forEach(recipe => console.log(`${recipe.title}`)))
  //Iteration 4 - Update recipe
  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  })
  .then(elm => { console.log(`The recipe ${elm.title} has been updated`,) })

  //Iteration 5 - Remove a recipe
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(elm => { console.log(`The recipe has been deleted`, elm) })

  //Iteration 6 - Close the Database
  .then(() => {
    return mongoose.connection.close((elm) => console.log(`Database disconnected`))
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });



