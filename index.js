const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then((response) =>
    Recipe.insertMany(data)
      .then((result) => console.log(`Added ${data.length} rows`))
      .catch((error) => {
        console.error(error);
      })
  )
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

async function showTitle() {
  const recipe = await Recipe.find() 
  try{
    recipe.forEach((title) => console.log(title.title))
  }
  catch(error){
    console.error(error)
  }
}
showTitle();

async function updateOneRegister(filter, params) {
  try{
    const recipe = Recipe.updateMany({ title: `${filter}` }, { duration: `${params}` })
    console.log("Update successful")
  }
  catch{
    console.error(error)
  }
}
updateOneRegister("Rigatoni alla Genovese", 100);

async function deleteOne(params) {
  try{
    const recipe = await Recipe.deleteOne({ title: `${params}` })
    console.log(`The row ${params} was deleted`)
  }catch{
    console.error(error)
  }
}
deleteOne('Carrot Cake')

function closeDB(){
  mongoose.connection.close(() => {
    console.log(
      'bye'
    );
  });
}

setTimeout(()=>{closeDB()},3000)