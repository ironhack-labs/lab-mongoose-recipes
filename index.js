const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost/recipe-app';

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
  .then(async () => {    
    await addRecipe();
    await addAllRecipes();
    await updateRecipe();
    await closeConnection();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  async function addRecipe(){
    const myRecipe={title: "Pasta alla boscaiola",
  level:"Easy Peasy" ,
  ingredients:["pasta", "mushrooms", "ham", "sausage", "cream"],
  cuisine: "Italian",
  dishType:"main_course",
  duration:20};
  Recipe.create(myRecipe).then(element=>console.log(element.title))
  }

  async function addAllRecipes(){
    Recipe.insertMany(data).then(elements=>{
      elements.forEach(el=>{
        console.log(el.title);  
      })
    })
  }

  async function updateRecipe(){
    Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100}).then(el=> console.log("Updated!"));
  }
  async function removeRecipe(){
    Recipe.deleteOne({title: "Carrot Cake"}).then(el=> console.log("Success!"));
  }

  async function closeConnection(){
    mongoose.connection.close();
  }