const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost/recipe-app';
console.log(data)
// Connection to the database "recipe-aapp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  //iteration 2
 // (async ()=>{
  //   try{
  //     const receip = await Recipe.insertMany({
  //       title: 'something',
  //       level: 'Easy Peasy',
  //       ingredients: ['something'],
  //       cuisine: 'something',
  //       dishType: 'breakfast', 
  //       duration: 30,
  //     });
  //     console.log(receip);
  //   } catch (error){
  //     console.log(error.message)
  //   }
  // })()
  
  //iteration 3
  // (async ()=>{
  //   try{
  //     const receip = await Recipe.insertMany(data);
  //     console.log(receip);
  //   } catch (error){
  //     console.log(error.message)
  //   }
  // })();

//iteration 4
//   (async ()=>{
//     try{
//   let updateRecipe = await Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100}, {new:true});
//   console.log(updateRecipe);
// } catch (error){
//   console.log(error.message)
// }
// })();

//iteration 5
(async ()=>{
  try{
let deleteRecipe = await Recipe.deleteOne({title:'Carrot Cake'});
console.log(deleteRecipe);
} catch (error){
console.log(error.message)
}
})();

//iteration 6
(async ()=>{
  try{
mongoose.connection.close(()=>{
  console.log('closed database')
});
} catch (error){
  console.log(error.message)
  }
  })();