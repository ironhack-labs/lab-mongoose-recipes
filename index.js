const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { modelName, insertMany } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

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

    async function insertRecets(){
      try{
        const NewRecet = await Recipe.create({
          title:"Quesadillas",
          level:"Easy Peasy",
          ingredients:["Queso","Tortilla"],
          cuisine:"Mexicana",
          dishType: "other",
          duration:5,
          creator:"Chef Alejandro",
        })
        
        const NuevasRecetas = await Recipe.insertMany(data)
        const ModifyRigatoni = await Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100})
        const DeleteCarrot = await Recipe.deleteOne({name:"Carrot Cake"})
        const DisconectMongoose = await mongoose.disconnect()
        console.log(NuevasRecetas)
        console.log(ModifyRigatoni)
        console.log(DeleteCarrot) 
        console.log("Mongoose Desconectado")

    
      }catch(error){
        console.log(error)
      }
    } 
    insertRecets()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
