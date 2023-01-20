const mongoose = require('mongoose');
mongoose.set('strictQuery', true); 

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const myRecipe = {
  "title": "Batata ao murro",
  "level": "Amateur Chef",
  "ingredients": [
    "1 kg de patatas",
    "500gr de Vainitas",
    "Una pisca de sal",
    "Una cucharada de aceite de oliva",
    "1 kg de Bacalao"

  ],
  "cuisine": "Portuguese",
  "dishType": "main_course",
  "image": "https://www.pingodoce.pt/wp-content/uploads/2017/09/batatas-a-murro.jpg",
  "duration": 30,
  "creator": "Chef Barbara"
};

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
  Recipe.create(myRecipe);
  console.log ( "Recipe creating" , myRecipe.title); 
  return Recipe.insertMany(data);
  })
  .then ((data) =>{
    for ( let recipe of data) {
      console.log ("Recipe creating", recipe.title)
      return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"} , {duration : 100}, { new:true} );
    }
  })
  .then ((recipe)=>{
 console.log (recipe.title, "Sucess update")
 return Recipe.findOneAndDelete ({title : "Carrot Cake"});
  })
  .then ((recipe)=>{
    console.log (recipe.title, "Sucess removed")
     })

    .then (()=>{
      mongoose.connection.close();
      console.log ("done")
    })
   .catch(error => {
    console.error('Error connecting to the database', error);
  });  
    // Run your code here, after you have insured that the connection was made
  
