const mongoose = require("mongoose")

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model")
// Import of the data from './data.json'
const data = require("./data")

const testRecipe = {
  "title": "Yummy Food",
  "level": "Amateur Chef",
  "ingredients": [
    "1/2 cup rice vinegar",
    "5 tablespoons honey"
  ],
  "cuisine": "Asian",
  "dishType": "main_course",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  "duration": 40,
  "creator": "Chef LePapu"
}

const MONGODB_URI = "mongodb://localhost:27017/recipe-app"

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`)
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase()
  })
  .then(() => {
    return Recipe.create(testRecipe)
    .then((recipe)=>console.log(`${recipe.title} recipe inserted`))
    .catch(error=> console.log(error))
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data)
    .then((recipeDB) => {
      recipeDB.forEach((recipe) => {
        console.log(`${recipe.title} recipe inserted.`)
      })
    })
    .catch(error=>console.log(error))
  })
  .then(()=>{
    return Recipe.updateOne({title: "Rigatoni alla Genovese"},{duration: 100})
    .then(()=>console.log(`recipe updated!`))
    .catch((error)=>console.log(`something went wrong updating item`))
  })
  .then(()=>{
    return Recipe.deleteOne({title: "Carrot Cake"})
    .then(()=>console.log(`recipe deleted!`))
    .catch((error)=>console.log(`something went wrong deleting item`))
  })
  .then(()=> {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose connection closed after everything finished"
      )
      process.exit(0)
    })
  })
  .catch((error) => {
    console.error("Error connecting to the database", error)
  })

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    )
    process.exit(0)
  })
})
