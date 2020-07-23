const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const nodemon = require('nodemon');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const coffee = {
    title: "Cocoffee",
    level: "Easy Peasy",
    ingredients: [ "Water", "Coffee", "Coconut"],
    cuisine: "Worldly world",
    dishType: 'drink',
    image: "",
    duration: 5,
    creator: "Coffe Daddy",
    
}
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
    //hoooooooooooooooooooooooooooooooooooooooooowwwwwwwwwwwwwwwwwwwwwwwwww
    return self.connection.dropDatabase();
  })

  .catch (error => {
    console.error('Error connecting to the database');
  })
  
    .then(() => {
       // Run your code here, after you have insured that the connection was made
      return Recipe.create(coffee) 
    })

    .catch ((error) => console.error("Error creating recipe", error))


    .then ((newRecipe) => {
      console.log(`The title of the recipe is ${newRecipe.title}`)
      return Recipe.insertMany(data)//Clau> "data" is the name of the js file
    })

    .catch((err) => {
      console.error("Error insertMany", err)
    })
  
    .then ((result) => {
      result.forEach((oneRecipe) => console.log(`The title of the recipe is ${oneRecipe.title}`))
      return Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese"}, 
        { $set: {duration: 100} },
        { new: true }
      )
    })
      
    .then((recipe) => console.log(`Success change to ${recipe.duration}`))

    Recipe.deleteOne({ title: 'Carrot Cake' })
    .then ((deletedRecipe) => {
      console.log(`The title of the recipe is ${deletedRecipe.title}`)
      mongoose.connection.close()
    })



//------------- future CL: im leaving this here made by Ferran, so you can have another way to solve it

// const mongoose = require('mongoose');
// ​
// // Import of the model Recipe from './models/Recipe.model.js'
// const Recipe = require('./models/Recipe.model');
// // Import of the data from './data.json'
// const data = require('./data');
// ​
// const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
// ​
// // Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(self => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any documents to the database, let's delete all previous entries
//     return self.connection.dropDatabase();
//   })
//   .then(() => {
//     manageQueries();
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });
// ​
// const manageQueries = async () => {
// ​
//   try{
// ​
//     let newRecipe = { 
//       title: 'Pasta', 
//       level: 'Easy Peasy', 
//       ingredients: ['pasta', 'salsa'], 
//       cuisine: 'italian', 
//       dishType: 'main_course', 
//       duration: 15,
//       creator: 'Chef Luis',
//     }
  
//     let query1 = await Recipe.create(newRecipe)
// ​
//     let query2 = await Recipe.insertMany(data)
// ​
//     let updateRecipe =  Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
// ​
//     let deleteRecipe =  Recipe.deleteOne({title: 'Carrot Cake'})
// ​
//     console.log(`A new recipe by ${query1.creator}`);
//     query2.forEach(recipe => console.log(recipe.title));
//     let results = await Promise.all([updateRecipe, deleteRecipe])
//     console.log(`${results[0]}`);
//     console.log(`${results[1].deletedCount} element deleted`)
//     await mongoose.connection.close()
//     console.log('Consola cerrada')
//   } catch (err){
//     console.log(err);
//   }
// ​
// }




    
    

  


