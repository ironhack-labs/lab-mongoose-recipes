const mongoose = require('mongoose');//connected to database

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)//connect
  .then(x => {// do this once connected
    console.log(`Connected to the database: "${x.connection.name}"`);//
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => { //using  model.create, add a new recipe and pass details as object and console log the title
//2. Run your code here, after you have insured that the connection was made 
const makeRecipe = {

  title:"Taiwanese Popcorn Chicken",
  level: "Amateur Chef",
  ingredients:["chicken cubes","corn starch", "salt", "pepper", "paprika", "basil", "oil"],
  cuisine:"Tawainese",
  dishType:"other",
  image:"https://images.media-allrecipes.com/images/75131.jpg",
  duration:60,
  creator:"Jay",
 };
  return Recipe.create(makeRecipe);
  })

//save? and insert mulitple recipes using model.insertMAny

  .then((newRecipe)=>{
   console.log(newRecipe.title)  //console log with the title
   return Recipe.insertMany(data);
})
  .then(()=>{
    newRecipe.forEach((newRecipe)=>
    console.log(newRecipe.title));
 

    return Recipe.findOneAndUpdate(
      {title:"Rigatoni alla Genovese"},
      {duration:100}
      
    );
  })

    .then(()=>{
     console.log('success!');
   
    return Recipe.findOneAndDelete(
      {title:"Carrot Cake"});

     })

     .then(()=>{
      console.log('successfully deleted')
     })

  //close connection:
  mongoose.connection.close(()=>{
    console.log("connection successfully closed")
  })

  .catch((error) => {
    
      console.error('Error connecting to the database', error);
  });

 

  //creating a model:
 //blueprint /model Cat--
  //const Cat = mongoose.model('Cat', { name: String });
// ^called 'cat' model  .... Cat is constructor function-- "Cat" decides what the name of the collections will be
//Cat constructor function creates objects with field "name" & "String" type
//{name.String} is 2nd arg. passed to mongoose.model called "Schema" .... {name:string=" cats all have a name thats a string"

//When Cat model is used to interact with databasem it will only interact with collectin that shares name -- cats collection
//model will have upppercase and be singular, 
//collection will have lowercase and be plural
//^^^^User --- users ( Model ---collections)

//to make a new cat/instance to modeland how:
//const kitty = new Cat({ name: 'Ironhack cat' });       it's like creating a class
//newCatToCreate.save();      to save what we create.       new "Cat" matches const Cat line 34 & {name:string} need to match schema