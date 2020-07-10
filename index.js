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
    // Run your code here, after you have insured that the connection was made
    const oneRecipe ={ 
      title: 'vov',
      level:'UltraPro Chef',
      ingredients:['ruckus','velkhare','revo'],
      cuisine: 'ao',
      dishType:'for',
      image:'rei',
      duration:'77',
      creator:'vfro',
      
      
      }
      
      
      Recipe.create(oneRecipe).then(user=>console.log(Recipe.find({},title)))
      Recipe.insertMany(data).then(user=>console.log(Recipe.find({},title)))
      Recipe.findOneAndUpdate({name:'Rigatoni alla Genovese'},{duration:100},function(){console.Log('success in updating')})
      Recipe.deleteOne({name:'Carrot Cake' }, function(){console.log('success in deleting')})
      
  })
  .then(db.shutdownServer())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
