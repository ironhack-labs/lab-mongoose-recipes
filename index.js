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
    updateDatabase();
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  async function updateDatabase(){
    try {
      const recipeCreated = await Recipe.create({
        title: "Barbecue", 
        level: "Easy Peasy", 
        ingredients: ["meat", "salt", "fire"],
        cuisine: "Gaúcha",
        dishType: "other",
        image: "https://famintas.com.br/wp-content/uploads/2018/05/pic1.jpg",
        duration: 300,
        creator: "Gabriel",
      });
      console.log(recipeCreated.title);
      const recipeArray = await Recipe.insertMany(data);
      recipeArray.forEach(element => {
        console.log(element.title);
      });
      
      await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 });
      console.log("changed sucess");
    
      await Recipe.deleteOne({title:"Carrot Cake"})
    } catch (error) {
      console.log('oh oh error!')
    } finally{
      mongoose.connection.close();
    }
}


