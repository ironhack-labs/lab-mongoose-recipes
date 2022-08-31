const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
console.log(data)

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
   return Recipe.insertMany(data)
    }) 

  .then((recetas) => recetas.forEach((el)=> console.log(el.title) ))

  .then(() => {
    const receta = new Recipe({
     title: 'peas with ham',
    level: 'Amateur Chef',
    ingredients: [ 'peas', 'egg', 'ham', 'water', 'potatoes', 'salt' ],
    cuisine: 'mediterranean cuisine',
    dishType: 'main_course',
    image: 'https://www.google.com/search?q=guisantes+con+jamon&rlz=1C1CHBF_esES868ES868&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiNm5C9tvH5AhVMaBoKHSC3DnYQ_AUoAnoECAIQBA&biw=1920&bih=872&dpr=1',
    duration: 30,
    creator: 'Cheef Daniel Gonzalez' 
  })
    return Recipe.create(receta)
  })

  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
  })

  .then((receta) => console.log(receta))
  
  .then(()=>{
    return Recipe.deleteOne({title:"Carrot Cake" })
  })

  .catch(error => {
    console.error('Error connecting to the database', error)
  })

  .finally(()=>{
    mongoose.disconnect()
  })

  

  
