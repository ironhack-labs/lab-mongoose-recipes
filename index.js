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
    return Recipe.syncIndexes()
  })
  .then(()=>{
  return Recipe.create({
     title: 'Almondigas de Caballo', 
     level: 'UltraPro Chef', 
     ingredients: ['Horse Meat', 'Garlic', 'tomato', 'albahaca','oil'], 
     cuisine: 'French'
    })

  })
  .then((newRecipe)=>{
    console.log('La nueva receta es', newRecipe)
    
    return Recipe.insertMany(data)

  })
  .then((allRecipes) =>{
    console.log("El método .insertMany() retorna todos las recetas", allRecipes)
    allRecipes.forEach(elm => {
      console.log('Los nombres de todas las recetas son', elm.title)
    });

    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, { $inc: { duration: 100 }})
  })
  
  .then((updateRecipe)=>{
    console.log('la receta', updateRecipe, 'fue actualizada con exito')

    return Recipe.deleteOne({ title: 'Carrot Cake'} )
  })
  .then((deletedRecipe)=>{
    console.log('la receta', deletedRecipe, ' ha sido eliminada conn exito');
    mongoose.disconnect(() => console.log("Desconectado con exito"))

  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
