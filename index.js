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
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  //.then (async() => {
  //const resdb = await Recipe.create(data[0]);
  // console.log(data[0].title);
  //})
  .then(async() =>{
    const resAll = await Recipe.insertMany(data);
    const resUpdate = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
    );
    const resDel = await Recipe.deleteOne({title:"Carrot Cake"});
    console.log("Success");
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
});

