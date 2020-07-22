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
    Recipe.create({title:"Chicken Soup", cuisine:"American"}).then(res =>{
      console.log(res)
    })
    Recipe.insertMany(data).then(res =>{
      res.map(each =>{
        console.log(each.title)
      })
    Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{$set:{duration:100}},{new:true}).then(res =>{
        console.log(res)
    })
    Recipe.deleteOne({title:"Carrot Cake"}).then(res =>{
      console.log("Carrot Cake removed succesfully")
    }).then(()=>{
    // console.log(mongoose.connections)
     mongoose.connection.close()
    })
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

 