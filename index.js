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
    Recipe.create({title:'Cold Chocolate Drink', level:'Easy Peasy', ingredients: ['oat milk','raw cacao'], cuisine:'Raw Foods', dishType: 'drink', duration: 2, creator: 'LWB'})
      .then(recipe => console.log(`The recipe was saved and its title is: ${recipe.title}`))
      .catch(error => console.log(`An error happened: ${error}`));
    
    Recipe.insertMany(data)
      .then (recipes => recipes.forEach(recipe => console.log(`Title: ${recipe.title}`)))
      .catch (error => console.log(`Error occurred adding recipes to database:${error}`));
      
    Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{$set:{duration:100}}, {new:true})
      .then (success => console.log(`Recipe successfully updated`))
      .catch( error => console.log(`Error occurred updating recipe: ${error}`));
    
    Recipe.deleteOne({title:'Carrot Cake'})
      .then (deleted => console.log(`Recipe successfully deleted`))
      .catch(error => console.log(`Error occurred deleting recipe: ${error}`));
    })

    .then(() => {
      mongoose.connection.close()
      .then(() => console.log('Connection with database closed successfully'))
      .catch(error => console.log(`Error disconnecting from Mongoose:${error}`));
        })
      
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
