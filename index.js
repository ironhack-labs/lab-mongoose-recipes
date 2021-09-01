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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
   return  Recipe.create({title: 'iamtitle', level: '5', ingredients: ['coca-cola'], cuisine: 'll', dishType: 'fish' , image: 'https://images.media-allrecipes.com/images/75131.jpg'}
    )
  }).then(()=>{
    console.log('Creado con exito')
    return     Recipe.create(data); 
  }).then(() => { 
    console.log('Succesful change');
      return  Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, {duration : '100' }) 
  })
  .then(() => {
    return  Recipe.deleteOne({title: 'Carrot Cake'})
  }).then(() => {
     console.log('Succesfull deleting');
  }).then(() => {
    console.log('Database connection  close');
      mongoose.connection.close(); 
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });