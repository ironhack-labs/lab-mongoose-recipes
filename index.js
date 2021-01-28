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
    Recipe.create({
      title: 'garlic mushrooms',
      level:'Amateur Chef',
      ingredients:['garlic','mushrooms','oil','white wine','salt'],
      cuisine:'International',
      dishType:'other',
      image:'https://www.google.com/search?q=champi%C3%B1ones+al+ajillo&rlz=1C1CHBD_esES857ES857&oq=champ&aqs=chrome.4.69i59l2j69i57j46i433j0i20i263i395i433j69i60l3.8571j1j4&sourceid=chrome&ie=UTF-8',
      duration:40,
      creator:' my wife',
      create: ``
      
    })
  
  .then((recipe) =>{
    console.log(recipe.title)
  })

  Recipe.insertMany(data)
  .then(recipes =>{
    recipes.forEach(recipe => {
      console.log(recipe.title)
    });

    Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100})
    .then(recipe=>{
      if(recipe){
        console.log(`recipe ${recipe.title} updated`)
      }else{
        console.log('recipe not found')
      }
    })
    
  })
  
  })

 
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
