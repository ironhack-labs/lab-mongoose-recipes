const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.insertMany(data)
    .then((data)=>{
      for(let i =0 ; i<data.length;i++){
        console.log(data[i].title)
      }

    Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese",},{duration:100,},{
      new:true,
    })
    .then(()=>{
      console.log("UPDATE RECIPE!")
    })
    .catch((e)=>{
      console.log("EStas teniendo un error",e)
    })
    
    Recipe.deleteOne({title:"Carrot Cake"},{new:true})
    .then(()=>{
      console.log("ELIMINADO")
    })





    })
    .catch((e)=>{
      console.log(e)
    })
    //console.log(data.length) Para saber si me da la longitud de las recetas
    //let filter= {title:"Rigatoni alla Genovese"}
    //let act={duration:100}
  

   
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
