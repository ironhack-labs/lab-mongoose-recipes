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
    return  Recipe.create([{title:"Macarrones",level:"Easy Peasy",ingredients:["Macarrones","Tomate Frito"],cuisine:"La de mi casa",dishType:"main_course",duration:10,creator:"Macarroni de la Hera",created:Date.now()}])

  })
  .then(theNewRecipe=>console.log(`Se ha creado la receta de los ${theNewRecipe[0].title}`))
  .then(()=>Recipe.create(data))
  .then(listOfRecipes=>console.log("se han creado las siguientes recetas",listOfRecipes))
  .then(()=>Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100}))
  .then(recipeUpdated=>console.log(`La receta ${recipeUpdated.title} ha sido modificada`))
  .then(()=>Recipe.deleteOne({title:"Carrot Cake"}))
  .then(recipeDeleted=>console.log(recipeDeleted))
  .then(()=>mongoose.connection.close())
  .then(()=>console.log("Hasta luego Lucas"))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  
  