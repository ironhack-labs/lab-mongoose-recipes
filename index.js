const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
const newRecipe = {
  title : "Arroz con tomate",
  level: "Easy Peasy",
  ingredients: ["rice", "tomato", "sauce", "water", "salt", "egg"],
  cuisine: "mediterranean",
  dishType: "main_course",
  image: "https://www.rebanando.com/media/arroz-12_crop.jpg/rh/arroz-a-la-cubana.jpg",
  duration: 25,
  creator: "Clever person",
  created: 01/01/1900
}


mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(newRecipe)
  })
  .then((res)=>{  
    console.log(res.title)
    return Recipe.insertMany(data)
      .then(res => {
        res.forEach((a)=>console.log(a.title))
    })
  })
  .then((res)=>{
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {$set:{duration: 100}})
    .then(res => console.log("Success!!!"))
  })
  .then(res => {
    return Recipe.deleteOne({title: "Carrot Cake"})
    .then(res => console.log("Deleted!!"))
  })
  .then(res => {
    mongoose.disconnect()
      .then(console.log("disconnected"))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
