const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

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
    // Run your code here, after you have insured that the connection was made
    // main()
    AllInOne();
    // findOneUpdate();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// async function main() {
//   const [recipe] = data
//   const newRecipe = await Recipe.create(recipe)
//   console.log(newRecipe)
//   }

async function AllInOne () {
  const insertRecipe = await Recipe.insertMany(data)
  insertRecipe.forEach((recipe)=>{
    console.log(`${recipe.title}`)
  })
  const update = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration: 100},{new: true})
  console.log(`Se ha cambiado la duracion de la receta ${update.title} a ${update.duration}min`)
  const deleteRecipe = await Recipe.deleteOne({title: "Carrot Cake"})
  mongoose.connection.close()
}

// async function findOneUpdate(){
//   const update = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration: 100},{new: true})
//   console.log(update)
// }