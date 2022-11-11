const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = "mongodb+srv://mongo-ib:capybara@cluster0.xifx6un.mongodb.net/?retryWrites=true&w=majority";

// Connection to the database "recipe-app"
  async function setData() {
    try{
      await mongoose.connect(MONGODB_URI)
      await Recipe.deleteMany()
      await Recipe.insertMany(data)
      await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
      await Recipe.deleteOne({title: "Carrot Cake"})
      console.log("done setting up the data")
      mongoose.connection.close()
    } catch(err) {
      console.log(err)
    }
  }
  setData()
