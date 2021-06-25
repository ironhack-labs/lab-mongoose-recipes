const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
const promise4 = mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const promise5 = Recipe.create({
  title: "pastelito",
  level: "Easy Peasy",
  ingredients: ["??","???"],
  cuisine: "apañola",
  dishType: "breakfast",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 20,
  creator: "yo"
})
.then((results)=>console.log(results.title))
.catch((error)=>console.log(error))
  
  
const promise1 = Recipe.insertMany(data)
.then((recetas)=> console.log(recetas))
.catch((error)=> console.log(error))

const promise2 = Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
// Client.findOneAndUpdate({ name: 'Alberto Marcos'}, {age: 50})//we find the client object and then we update his age
// .then( (updatedClient) => console.log(updatedClient))
// .catch( error => console.log(error))
const promise3 = Recipe.findOneAndDelete({title:"Carrot Cake"}
)
.then(()=>console.log("Element deleted"));

Promise.all([promise1, promise2, promise3, promise4, promise5])
  .then(()=> mongoose.connection.close(()=> console.log("connection closed!!")))
