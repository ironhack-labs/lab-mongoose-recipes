const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const spaguetti = {
  "title": "Spaguetti",
  "level": "Easy Peasy",
  "ingredients": [
    "150 gr spaguetti pasta",
    "Tomate",
    "Cheese",
    "Meat balls",
  ],
  "cuisine": "Italian",
  "dishType": "main_course",
  "image": "",
  "duration": 10,
  "creator": "Chef Fer"
}
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  })

   .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create(spaguetti).then(newPasta => console.log(`${newPasta.title}`))
    Recipe.insertMany(data).then((dataNew) => {
      dataNew.forEach((recipe) => console.log(`${recipe.title}`));
    })
    Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100},{new:true})
    .then(recipeUpdated =>console.log(`${recipeUpdated.title} new duration ${recipeUpdated.duration}`))
    Recipe.deleteOne({title:'Carrot Cake'})
    .then(deletedRecipe => console.log(`${deletedRecipe.title} has been deleted succesfully`))
   
    .then(()=> {
      console.log(`Mongoose closing`)
      mongoose.connection.close()})
    .catch(err =>{
      console.error('Error in CRUD',err)
    })
   
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  }); 

 