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
    // return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
      title: "Paella",
      cuisine: "Spanish"
    })
    .then((res)=>{
      console.log(res,'inserted')
    })
    .catch((err)=>console.log(err))
    Recipe.insertMany(data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    Recipe.updateOne({title: "Rigatoni alla Genovese"},{duration: 100})
        .then(()=>console.log('success'))
        .catch(err=>console.log(err))
    Recipe.deleteOne({title: "Carrot Cake"})
        .then(res => console.log(res,'has been succesfully deleted'))
        .catch(err => console.log(err))
     connection.close()
   
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  