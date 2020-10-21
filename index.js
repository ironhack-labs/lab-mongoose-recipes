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
    (async () => {
      try {
        const recipes = await Recipe.create({
        title:"canelones",
        cuisine:"italiana"
        });
        console.log(`This recipe was saved ${recipes.title}`);
        return recipes;
      } catch (error) {
        console.log(error.message);
      }
    })();
  
  (async() =>{
    try{
      const insert = await Recipe.insertMany(data);
      console.log(insert.map(acc=> console.log(recipes.title)));
    }catch(error){
      console.log(error.message)
    }
  })();
  
  (async()=> {
    try{
      const recipe= await Recipe.findOneAndUpdate(
        {title: 'Rigatoni alla Genevese'},
        {duration:100},
        {new:true}
      );
      console.log(recipe)
    }catch(error){
      console.log(error.message)
    }
  })();
    // Run your code here, after you have insured that the connection was made
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
  
