const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { deleteOne } = require('./models/Recipe.model');


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
    // Run your code here, after you have insured that the connection was made
    Recipe
      .create({title: 'Gazpacho', level: 'Easy Peasy', ingredients:['tomato', 'bread','water'], cuisine: 'Spanish', dishType: 'drink', image: 'https://elpetitchef.com/sites/default/files/2020-11/presentacion_77.jpg', duration: 20, creator: 'Víctor', created: 2011-09-29})
      .then(newRecipe => console.log(`Esta receta se llama ${newRecipe.title}`))
    
    Recipe
      .create(data)
      .then(recipe => 
      {recipe.forEach(elm => console.log(`Esta receta se llama ${elm.title}`))
      Recipe
      .updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }) // // He modificado la duración en la base de datos
      .then(info => console.log("Los detalles de la modificación son:", info))
      Recipe
      .deleteOne({ title: 'Carrot Cake' })
      .then(info => console.log('Ya no está disponible Carrot Cake', info))      
      .catch(err => console.log('ERROR ', err))
      // //mongoose.connection.close()
    })
    
      
    

    
    
    
      
      
    

    






  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
