const mongoose = require('mongoose'); // Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model'); // Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://0.0.0.0:27017/recipe-app'; // Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
       title: "Pasta", 
      level: "Easy Peasy",
       ingredients: ["1 egg2", "½ teaspoon salt", "1 cup all-purpose flour", "2 tablespoons water"],
       cuisine:"Italian",
      dishType: "main_course",
      image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9058386.jpg&w=595&h=595&c=sc&poi=face&q=60",
       duration: 15,
       creator: "Paolo Agnese",
       created: Date.now(),
    })


  })
  .then((title) =>{
     console.log(title.title)
   })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  Recipe.insertMany(data,)
  .then(recipes =>{ console.log('All recipes have been added', recipes)})
  .catch(err=>{console.log('There was an error: ', err)});
  


  Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"} , {duration: "100"})
  .then(recipe =>{
    (console.log('Succesfully updated', recipe));    
  })
  .catch(err =>{
      console.log(err)
  });
  
  Recipe.deleteOne({title: "Carrot Cake"})
  .then(recipe =>{
    console.log('Recipe deleted', recipe)
     mongoose.connection.close();
})
  .catch(err=>{ console.log(err)});
