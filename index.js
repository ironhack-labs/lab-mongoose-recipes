const express       = require('express');
const hbs           = require('hbs');
const path          = require('path'); 
const app           = express();
const mongoose      = require('mongoose');



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
  /*
    .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);

    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
 */
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  //4.RUTAS
  //ITERACION1
  app.get("/newrecipe",async ()=>{
    let info = {
      "title": "Pollito",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      "cuisine": "Asian",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 40,
      "creator": "Chef LePapu"
    }
    
    let recipeCreate = await Recipe.create(info)
    console.log(recipeCreate)
  })

//ITEARCION3
  app.get("/addrecipe", async ()=>{
    
    let recipesAdded = await Recipe.insertMany(data)

    recipesAdded.map((element)=>{
      console.log(element.title)
    })
    //console.log(recipeAdded.title)

  })
//ITERACION4
  app.get("/updaterecipe", async()=>{

    let updateRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese" },{duration: 100})

    console.log("succes",updateRecipe)
  })

//ITERACION5

app.get("/removerecipe", async () =>{
  let removeRecipe = await Recipe.deleteOne({ title: 'Carrot Cake'})

  console.log(removeRecipe)
})


//LEVANTAMIENTO
app.listen(3000, ()=>{
  console.log("Esta conectado")
})

