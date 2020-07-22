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
    // Iteration 2
    // Recipe.create(data[0]).then(res => console.log(res.title))

    // Iteration 3
    Recipe.insertMany(data).then(res => {res.forEach(x => {console.log(x.title)})}).then(() => {
      // Iteration 4
      Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100},{new:true}).then(() => console.log("Succes!"))
    }) // Iteration 5
    .then(() =>Recipe.deleteOne({title:"Carrot Cake"})).then(() => console.log("remove carrot"))
    
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  // Iteration 6
mongoose.connection.close()