const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

// const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI, {
//     // useCreateIndex: true,
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true
//   })
//   .then(self => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany()
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });

const DB = 'recipe-app'

//models

const connectToMongo = async()=>{
    try{
       await mongoose.connect(`mongodb://localhost:27017/${DB}`, {

        }) 
            console.log('Conectado a Mongo')

    }catch(err){
        console.log('Error:', err)
    }
}

connectToMongo()

 
//iteration 6 🔥🔥🔥
const closeMongoConnection = async()=>{
  try{
    await mongoose.connection.close()
    console.log('Connection Closed successfully')
  }catch(err){
    console.log('Error: ', err)
  }
}

closeMongoConnection()


const createRecipe = async()=>{
  try{
    const recipe = await Recipe.create({
      title:"Gazpacho",
      level: "Amateur Chef",
      ingredients:[
        "2 cucumbers",
        "1 garlic",
        "1 onion",
        "4 tomatoes",
        "3 cups of water",
        "1 bread "
      ],
      cuisine:"Mediterranean",
      dishType:"soup",
      image:"https://www.lavanguardia.com/files/image_948_465/uploads/2018/06/01/5e99784964d1d.jpeg", 
      duration:30, 
      creator:"Popular dish"
    })

  }catch(err){
    console.log("Error", err)
  }
}

//createRecipe()

//Iteration 3

const insertAllRecipes = async ()=>{
  try{
    const allRecipes = await Recipe.insertMany(data)
    allRecipes.forEach((recipe)=>{
      console.log("Title", recipe.title)
    })
    console.log(allRecipes)
  }catch(err){
    console.log("Error", err)
  }
}

//insertAllRecipes()


//Iteration 4
const updateOneRecipe = async()=>{
  try{
const oneRecipeUpdated = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100},
{new:true})
console.log("Rigatoni alla Genovese recipe has been modified successfully")
  }catch(err){
    console.log('Error: ', err)
  }
}
//updateOneRecipe()

//Iteration 5

const deleteOneRecipe = async ()=>{
try{
const oneRecipeDeleted = await Recipe.findOneAndDelete (
  {_id:"61914fe6b844c83224433902"}
)
console.log('Carrot Cake recipe has been successfully deleted')
}catch(err){
  console.log('Error: ', err)
}
}

//deleteOneRecipe()