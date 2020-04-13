const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const myRecipe = {
  title: "CheeseCake",
  level: "Easy Peasy",
  ingredients:"RedFruits",
  cuisine:"Francese",
  dishType:"dessert",
  image:"https://images.media-allrecipes.com/images/75131.jpg",
  duration:20,
}
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
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .then( () => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(myRecipe).then(recipes =>{
      console.log("myRecipe was added")
    }
  )
  .catch(error => {
    console.error('Error adding the Recipe', error);
  })

    Recipe.insertMany([{
      title: "Hamburguer",
      level: "Easy Peasy",
      ingredients:"RedFruits",
      cuisine:"American",
      dishType:"main_course",
      image:"https://images.media-allrecipes.com/images/75131.jpg",
      duration:7,
    },
    {
      title: "Pizza",
      level: "Easy Peasy",
      ingredients:"Pepperoni",
      cuisine:"Italian",
      dishType:"main_course",
      image:"https://images.media-allrecipes.com/images/75131.jpg",
      duration:15,
    }]).then(recipes =>{
      recipes.forEach(recipe =>{
        console.log(recipe.title)
    })
        Recipe.findOneAndUpdate({title:"Pizza"},{duration:14}).then(recipes =>{
          console.log("Pizza min changed")}
          ).catch(error => {
            console.error('Error finding and updating a Recipe', error);
          })
        
      
      })
.catch(error => {
  console.error('Error adding the Recipes', error);
})
    Recipe.findOneAndUpdate({title:"Pizza"},{duration:14}).then(recipes =>{
    console.log("Pizza min changed")
     mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
    }) 
})
.catch(error => {
  console.error('Error finding and updating a Recipe', error);
})
.catch(error=>{
  console.log("Some error !!! NOoOooooo")
})
})

