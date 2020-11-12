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
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
      Recipe.create({title: 'pedro', level: 'Easy Peasy', cuisine: 'spanish', dishType:  'breakfast', duration: 12,  })
    .then ( (recipe) => {
      console.log(recipe)
    })
  })
  .then ( () => {
    Recipe.insertMany(data)
    .then ( () => {
      const filter = {title: 'Rigatoni alla Genovese'};
      const update = {duration: 100};
      const rigatoni = Recipe.findOne(filter)
      Recipe.findOneAndUpdate(filter, update).then( () => {console.log(rigatoni)})
      .then( () => {
        Recipe.deleteOne({title: 'Carrot Cake'}).then( () => {
          console.log('carrot removed')
        })
      })
      
    })
    
    // .then( () => {
    //   mongoose.connection.close()
    //   console.log('connection closed')
    // })

    console.log('insetmany works')
  })
  

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
 