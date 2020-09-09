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
    /*
    // Iteration 2 - Create a recipe
      Recipe.create(
      
      {title:"Chorizo and mozzarella gnocchi bake" ,
      level:"Easy Peasy",
      ingredients:[
        "1 tbsp olive oil",
        "1 onion , finely chopped",
        "2 garlic cloves , crushed",
        "120g chorizo , diced",
        "2 x 400g cans chopped tomatoes",
        "1 tsp caster sugar",
        "600g fresh gnocchi",
        "125g mozzarella ball, cut into chunks",
        "small bunch of basil"],
      cuisine: "Traditional",
      dishType:"main_course",
      image:"http://www.cylabeth.com/ironhack/dbrecipes/unochorizo.jpg",
      duration:25,
      creator: "Marianne Turner"
      })
      .then(() => console.log(`Se han creado una nueva receta`))
      .catch(err => console.log(`Hubo un error: ${err}`))

      //Iteration 3 -  Insert multiple recipes
      Recipe.insertMany(data)
      .then(theNewRecipes => console.log(`Se han creado ${theNewRecipes.length} nuevas recetas`))
      .catch(err => console.log(`Hubo un error: ${err}`))

      //Iteration 4 -  Update recipe
      Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration: 100})
      .then(() => console.log('Se ha modificado la receta'))
      .catch(err => console.log(`Hubo un error: ${err}`))

     //Iteration 5 - Remove a recipe
      Recipe.deleteOne({title:"Carrot Cake"})
      .then(() => console.log('Se ha eliminado la receta'))
      .catch(err => console.log(`Hubo un error: ${err}`))
  
     //Iteraction 6 - Close The Database
       mongoose.connection.close() 
*/
    /* Made with Promeses */ 
    Recipe.create(
      
      {title:"Chorizo and mozzarella gnocchi bake" ,
      level:"Easy Peasy",
      ingredients:[
        "1 tbsp olive oil",
        "1 onion , finely chopped",
        "2 garlic cloves , crushed",
        "120g chorizo , diced",
        "2 x 400g cans chopped tomatoes",
        "1 tsp caster sugar",
        "600g fresh gnocchi",
        "125g mozzarella ball, cut into chunks",
        "small bunch of basil"],
      cuisine: "Traditional",
      dishType:"main_course",
      image:"http://www.cylabeth.com/ironhack/dbrecipes/unochorizo.jpg",
      duration:25,
      creator: "Marianne Turner"
      })
      .then(theRecipe => {
          console.log(`Se ha creado una nueva receta de ${theRecipe.title}`)
          return Recipe.find({})
      })
      .then(theRecipes => {
          console.log("Hay nuevas recetas ", theRecipes)
          return Recipe.insertMany(data)
      })
      .then(theRecipes => {
          return theRecipes.forEach(recipe => console.log("Hay una receta de ",recipe.title))
      })
      .then(() => Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration: 100},{new: true }))
      .then(recipeUpdate => console.log("Recipe Update ",recipeUpdate))  
      .then(() => Recipe.deleteOne({title:"Carrot Cake"}))
      .then(recipeDelete => console.log("Recipe Delete ",recipeDelete))  
      .then(() =>  mongoose.connection.close() )
      .catch(err => console.log(`Hubo un error: ${err}`))
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
