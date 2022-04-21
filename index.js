const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

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
    // Run your code here, after you have insured that the connection was made
    async function manipulateRecipes(){
      try{
        //Create Recipe
        const crearRecipe = await Recipe.create({
          title: "Hot Cakes",
          level: "Easy Peasy",
          ingredients: [
            "Milk",
            "Hot Cake Flour",
            "Butter",
            "Mapple",
          ],
          cuisine: "American",
          dishType: "Breakfast",
          image: "https://images.aws.nestle.recipes/original/4ba3978c241c628affcaf5c4e837270e_hot_cakes_clasicos_-_desayuno.jpg",
          duration: 40,
          creator: "It's a mistery"
        })

        console.log("ITERATION 2 CREATE A RECIPE:",crearRecipe);

        //Insert Many
        const insertManyRecipes=await Recipe.insertMany(data)

        console.log("ITERATION 3: PRINT RECIPES TITLES:")
        insertManyRecipes.forEach((objet)=>(console.log(objet.title)));


        //Update
        const updateRecipe= await Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100},{new:true})
        console.log("ITERATION 4 : UPDATE", updateRecipe);

        //Remove
        const removeRecipe = await Recipe.deleteOne({title:"Carrot Cake"})
        console.log("ITERATION 5 : DELETED CARROT CAKE")

        const disconnect= await mongoose.disconnect()
        console.log("Disconected")


      }catch(error){
        console.log("Error",error)
      }
    }
    manipulateRecipes();
  })



  .catch(error => {
    console.error('Error connecting to the database', error);
  });



