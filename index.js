const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

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
    const newRecipe = {
      // TODO: write the schema
      title :'Garlic chicken',
      level:'Amateur Chef',
      ingredients:[ '1 kg. frozen or fresh shrimp', '20 garlic cloves', '2 dried chillies (cayenne peppers also work)', 'Extra virgin olive oil (about 20 tablespoons)', 'Salt and freshly ground black pepper (to taste) '],
      cuisine:'Tipical Spanish',
      dishType:'main_course',
      image:'https://www.recetasderechupete.com/wp-content/uploads/2017/08/Gambas-al-ajillo-768x527.jpg',
      duration: 20,
      creator:'SomeOne long... longTime a go' 
    };
    console.log(newRecipe.title);
    return Recipe.create(newRecipe)
  })
  .then (() => console.log('Created a new recipe', Recipe))
  .then(recipe => {
    console.log(data);
    return Recipe.create(data)
  })
  .then(() => Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, { duration:100 }, {new: true} ))
  .then(recipe => console.log('update Rigatoni alla Genovese duration', recipe))
  .then(() => Recipe.deleteOne({title:'Carrot Cake'}))
  .then(recipe => console.log(' Deleted Carrot Cake', recipe))
  .then(() => mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
