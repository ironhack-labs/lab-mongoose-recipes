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
                  title: "Salmorejo", 
                  type: "Easy Peasy", 
                  ingredients: ["tomato", "bread", "garlic", "olive oil", "jerez vinegar"], 
                  cuisine: "mediterranean", 
                  dishType: "soup", 
                  duration: 20, 
                  creator: "Juan Pestana", 
                  created: Date.now()
                })
    .then(newRecipe => console.log(newRecipe.title))



    .then(() => Recipe.create(data))
    .then(newRecipes => console.log(newRecipes.length))


    .then(() => Recipe.updateOne({title: "Rigatoni alla Genovese"},{duration: 100}))
    .then(changes => console.log("los cambios qque se han hecho son:  ", changes))


    .then(() => Recipe.deleteOne({title: "Carrot Cake"}))
    .then(deleted => console.log('se ha eliminado el Carrot Cake  ', deleted))

    .then(()=> mongoose.connection.close())
      
    .then(() => console.log("cerramos la conexión con la base de datos"))

    .catch(err => console.log("Hubo algún fallo en alguna de las operaciones", err))


  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

