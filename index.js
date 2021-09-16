const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const newRecipe={title:' Tacos de huevo a la mexicana',
level:'Easy Peasy',
ingredientes:['eggs','onion','oil','tomatoes','tortillas'],
cuisine:"Mexican",
dishType:'breakfast',
duration:15,
creator:'Diana'
}
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
  .then((self) => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(newRecipe) 
  .then((recipe)=>{
    console.log(recipe.title)
  })
  .catch ((error)=>{
    console.log('Error connecting to the database',error);
  })

  Recipe.insertMany(data)
  .then((data)=>{
    for(let i=0;i<data.length;i++){ // para iterar por todas mis recetas
      console.log(data[i].title)
    }
    Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration:100},{new:true})
  .then((err,recipe)=>{
    console.log('Succes message!')
    console.log(err,recipe)
  })  .catch ((error)=>{
    console.log('Error connecting to the database',error);
  })
  Recipe.deleteOne({title:'Carrot Cake'})
  .then(()=>{
    console.log('Succes message!')
  }) 

  })
  .catch ((error)=>{
    console.log('Error connecting to the database',error);
  })

  
})
  .catch(error => {
    console.error(process.exit(1));
  });

  
  
