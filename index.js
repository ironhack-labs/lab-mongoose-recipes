const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
const promise1 = mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const promise2 = Recipe.create(
  {
  title: "Blueberry Muffins",
  level: "Easy Peasy",
  ingredients: ["flour","sugar","butter"],
  cuisine: "Americano",
  dishType: "breakfast",
  image: "https://www.simplejoy.com/wp-content/uploads/2020/04/healthy-blueberry-muffins-__-683x1024.webp",
  duration: 20,
  creator: "Daniel Childs"
})
  .then((result) => console.log(result.title))
  .catch((error) => console.log(error))



const promise3 = Recipe.insertMany(data)
  .then((receta) => console.log(receta))
  .catch((err) => console.log(err));


const promise4 = Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  .then( () => console.log("You have updated the information!"))
  .catch( error => console.log(error))


const promise5 = Recipe.deleteOne({title: "Carrot Cake"})
  .then(() => console.log("You have deleted the carrot cake!"))
  .catch((error) => console.log(error))


Promise.all([promise1, promise2, promise3, promise4, promise5])
  .then(() => mongoose.connection.close (() => console.log("connection closed")))
