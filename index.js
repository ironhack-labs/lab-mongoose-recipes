const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'

const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
//mongoose.set('useFindAndModify', false)
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  
   .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

const pepe= {
  title: "tortilla de patata",
  level: "Amateur Chef",
  ingredients: [
    "huevos",
    "patata",
    "chorizo",
    "ketchuip",
  ],
  cuisine: "International",
  dishType: "dessert",
  image: "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
  duration: 180,
  creator: "Chef Nadia"
}
/*Recipe.create(pepe).then(newRecipes => {console.log('Los nuevos elementos creados:', newRecipes)})*/
  .then(() => Recipe.insertMany(data))
  .then(newRecipes => console.log('Los nuevos elementos creados:', newRecipes))
  .then(()=>Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, { $set: { duration: 100 }}, {new:true} ))
  .then(() => Recipe.deleteOne({title: 'Carrot Cake'},console.log("recipe deleted")))
  .then(()=>mongoose.connection.close())
  .catch(err => console.error("no hemos podido borrar el elemento"))

