const mongoose = require('mongoose');
const chalk = require('chalk');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const DB = 'recipe-app';


// Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
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


const connectToMongo = async()=>{
  try {

   await mongoose.connect(`mongodb://localhost:27017/${DB}`, {  
      useNewUrlParser: true,
      useUnifiedTopology: true,  
    })
    
    console.log(chalk.bgBlue('Conectado a Mongo'))

  } catch(err){
    console.log('Error:', err)
  }
}

// connectToMongo()   ITERATION 6  🔥🔥 -- Comento esta función para que no se conecte a la BBDD ¿? No tengo claro que sea correcto...🙄



//ITERATION 2 - CREATE A RECEIPE 🔥🔥

const createRecipe = async()=>{  
  try{
    const myReceipe = await Recipe.create({
      title: "Parmigiana di melanzane",
      level: "Amateur Chef",
      ingredients: [
        "3 large firm aubergines",
        "olive oil",
        "1 onion",
        "½ a bulb of spring garlic , or 1 clove of regular garlic",
        "1 heaped teaspoon dried oregano",
        "2 x 400 g tins of quality plum tomatoes",
        "wine vinegar",
        "1 bunch of fresh basil , (30g)",
        "3 large handfuls of Parmesan cheese",
        "2 handfuls of dried breadcrumbs",
        "a few sprigs of fresh oregano",
        "150 g buffalo mozzarella"
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/33_1_1350893951.jpg?tr=w-800,h-1066",
      duration: 90,
      creator: "Chef Guillem"
    })
    console.log(receipe)
  }catch(err){
    console.log('ERROR: ', err)
  }

}

  // createRecipe()




//ITERATION 3 - INSERT RECIPES FROM data.json 🔥🔥

  const createDataRecipe = async()=>{  
    try{
      const dataRecipes = await Recipe.insertMany(data)
      dataRecipes.forEach((recipe) => {
      console.log(chalk.bgBlue("Title ", recipe.title))
      })
      console.log(dataRecipes)

    }catch(err){
      console.log('ERROR: ', err)
    }
  
  }
//createDataRecipe()


//ITERATION 4 - UPDATE 🔥🔥

//findOneAndUpdate() al primer argument posem un key xq trobi el document que volem canviar, i al segon hi posem el valor a modificar. si en volem modificar més d'1 ho anem posant entre {} i separats per ,
//Posar {new: true} xq em retorni l'estudiant actualitzat 
//explicació JJ ---> .findOneAndUpdate(<target>, <elementos que quiero cambiar>, {new: true}) --> Este metodo nos va a buscar un documento (target) y lo va a editar según los elementos que hayamos pasado en el segundo argumento (dentro de un objeto literal)

const updateRecipe = async ()=>{
  try{
    const recipe = await Recipe.findOneAndUpdate(
      {title: 'Rigatoni alla Genovese'}, 
      {duration: 100},
      {new: true}
    )
    console.log('Rigatoni alla Genovese; duration succesfully modified')
  }catch(err){
    console.log('error: ', err)
  }
}

  // updateRecipe()



//ITERATION 5 - Remove a recipe 🔥🔥

const deleteOneRecipe = async ()=>{
  try{
    const deleteRecipe = await Recipe.findOneAndDelete({title: "Carrot Cake"}) 
    console.log('Carrot cake doc. has been succesfully removed')
  }catch(err){
    console.log(err)
  }
}

// deleteOneRecipe()