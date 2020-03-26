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
    Recipe.create({
  
      title: 'Carbonara',
      level: 'Easy Peasy',
      ingredients: ['eggs', 'pancetta', 'black pepper', 'Pasta', 'Parmesan Cheese'],
      cuisine: 'Italian',
      dishType: 'Dish',
      image: 'https://www.wine.com.br%2Fwinepedia%2Fwp-content%2Fuploads%2F2016%2F10%2FiStock-479271670.jpg%3Fresize%3D1180%252C517%26ssl%3D1&imgrefurl=https%3A%2F%2Fwww.wine.com.br%2Fwinepedia%2Fharmonizacao-de-a-a-w%2Fespaguete-a-carbonara%2F&tbnid=vSHCuLaLcTq5KM&vet=12ahUKEwjk9qWB-LjoAhUjJrkGHaptDOUQMygRegUIARDiAQ..i&docid=R9hEfXg8sP_KZM&w=1180&h=517&q=carbonara&ved=2ahUKEwjk9qWB-LjoAhUjJrkGHaptDOUQMygRegUIARDiAQ',
      duration: 20,
      creator: '',
    
    })
    .then(response => {
        console.log(`${response.title} recipe created`);
      })
    .catch(error => console.log(error));
    
    Recipe
      .insertMany(data)
      .then(data => {
        data.map(recipe => console.log(`${recipe.title} created`))
        
        Recipe
          .updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
          .then(response => console.log(`${response.title} updated`))
          .catch(error => console.log(error))
      
        Recipe
          .deleteOne({ title: 'Carrot Cake' })
          .then(resolve => {

            console.log('recipe deleted!', resolve)
            mongoose.connection.close();
          }) // closing deleteOne
          .catch(error => console.log(error))
        
      }) //closing insertMany  
      .catch(error => console.log(error));
      
    
  }) // closing mongoose 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



  



