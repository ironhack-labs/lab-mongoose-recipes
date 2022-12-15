const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  //Iteration 2 - Create a recipe
  .then(() => {
    return Recipe.create({
      title:"Lemon cheesecake",
      level: "Amateur Chef",
      ingredients: ["butter", "nut biscuits","eggs","vanilla","sugar","cream cheese","lemon","raspberries"],
      cuisine: "english",
      dishType:"dessert",
      duration:60,
      creator:"Jamie Oliver"
    })
  })
  .then((recipeFromDB) => {
    console.log(recipeFromDB.title)
  })
  //Iteration 3 - Insert multiple recipes
  .then(()=>{ 
    return Recipe.insertMany(data)
  })
  .then((dataFromDate)=>{ 
    dataFromDate.forEach((ele)=>{
        console.log(ele.title)
    })
   
  })
  //Iteration 4 - Update recipe
  .then(()=>{ 
    const updateInfo = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 });
    return updateInfo;
  })  
  .then((updateInfo) =>{
     console.log(updateInfo)
  })
  
   //Iteration 5 - Remove a recipe
  .then(()=>{ 
     return Recipe.deleteOne({title: "Carrot Cake"})     
    })
  .then(recipe => console.log("Delete carrot cake"))
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  //Iteration 6 - Close the Database
  mongoose.connection.close()