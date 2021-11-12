
// Import mongoose to index.js 

const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

const connectToMongo = async()=>{
  try{
  await  mongoose.connect('mongodb://localhost:27017/recipe-app',{
   useCreateIndex:true,
   useNewUrlParser: true,
   useUnifiedTopology: true,
}) 
console.log('Connected to the database: recipe-app 🥘 ')

   }catch(err){
       console.log ('Error connecting to the database', error)
   }

}

connectToMongo()


// Create recipe 

const createRecipe = async()=>{
  try{
    const recipe = await Recipe.create({
      title: "Carrot Cake",
      level:"Easy Peasy",
      ingredients:"flour, eggs, sugar, carrots, and baking powder ",
      cuisine: "English",
      dishType:"dessert",
      image:"https://www.llopartec.com/sites/default/files/styles/12col169custom_user_lg_1x/public/imatges/blog/carrot-cake.jpg?itok=QKx6xn6q&timestamp=1620719367",
      duration:120,
      creator:"Antoine Beauvilliers",
      created:08/05/1814,
    })
    console.log (recipe.title)
  } catch(error){
    console.log ('Error connecting to the database', error)
}
}

// createRecipe()

