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
.then((self) => {
console.log(`Connected to the database: "${self.connection.name}"`);
// Before adding any recipes to the database, let's remove all existing ones
return Recipe.deleteMany();
})
.then(() => {
 Recipe.create({   // iteracion 2
   title:"papas con mojo",
   cuisine:"majorera",
 }).then((element)=>{
   console.log(element.title)
 })  
 //iteracion 3
  Recipe.insertMany(data).then((elements)=>{
   elements.forEach(element =>{
     console.log(element.title)
   })
   //iteracion 4
   let promise1 = Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100}).then(()=>{
     console.log("he cambiado el tiempo")
   })
   //iteracion 5
   let promise2 = Recipe.findOneAndRemove({title:'Carrot Cake'}).then(()=>{
     console.log("he borrado la tarta")
   })
   //iteracion 6
   Promise.all([promise1,promise2]).then(()=>{
     console.log("todos los cambios realizados")
     mongoose.connection.close();
   })

 }).catch((error) => {
  console.error('Error connecting to the database', error);
  }); 
});