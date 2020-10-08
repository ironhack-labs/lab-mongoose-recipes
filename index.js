const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
// const { model } = require('./models/Recipe.model');


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
   
    Recipe.create({title:"Pizza", level: "Amateur Chef", cuisine: "Italian", ingredients: ["flour", 'cheese', 'tomato sauce', 'pure magic']})
    .then((recipe) => {
      console.log(recipe.title)
    })
    .catch()

    Recipe.insertMany(data)
    .then((allRecipes) =>{

      allRecipes.forEach((recipe) => {
        console.log(recipe.title)
      })
      let updatePromise = Recipe.updateOne({title:"Rigatoni alla Genovese"}, {duration:100})
      updatePromise.then(()=>{
        console.log("updated")
      })
      let deletePromise= Recipe.deleteOne({title:"Carrot Cake"})
      deletePromise.then(() =>{
        console.log("SUCCESSSSS")

      })

      Promise.all([updatePromise, deletePromise])
        .then(() => {
           mongoose.connection.close()
             .then(() => {
               console.log(`Connection closed`)
             })
        })

    })
    .catch((recipe) =>{
      console.log(recipe.title)
    })

 

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
    
  });


  