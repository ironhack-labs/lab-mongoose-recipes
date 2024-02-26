const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const newRecipe = {
      title:'Bitoque',
      level:'Amateur Chef',
      ingredients:['200g White Rice','250g Beef Steak','200g Potatoes','1 Egg','1 garlic clove','2 Bay leaves','olive oil','mustard','50ml milk','dry coriander'],
      cuisine:'Portuguese',
      dishType:'main_course',
      image:'https://oseubitoque.pt/wp-content/uploads/2018/05/bitoque_frango_manteiga.jpg',
      duration:20,
      creator:'Xô Manel',
    }
    console.log(Recipe.title)
    return Recipe.create(newRecipe);

  })

  .then(() =>{
    
    return Recipe.insertMany(data);
  })

  .then(()=>{
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });

  })
  .then(()=>{
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Connection is closed');})
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
