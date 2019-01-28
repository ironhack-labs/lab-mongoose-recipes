const data = require('./data.js');
const Recipe = require('./models/recipe_entries.js');

//Iteration 2

Recipe.create({
  title: "Ceviche",
  level: 'UltraPro Chef',
  ingredients: ['Fish', 'Salt', 'Onion'],
  cuisine: 'International',
  dishType: 'Dish',
  creator: 'Gaston'
})
  .then( newRecipe => {
    console.log(`Recipe ${newRecipe.title} was added`);
  })
  .catch(err => {
    console.log("An error happened ", err);
})

//Iteration 3


Recipe.insertMany(data)
.then( (newRecipe) => {
    console.log('Recipes have been added');
    Recipe.find({},(err,recipes)=>{
      recipes.forEach((recipe)=>{
        console.log('Recipe:', recipe.title)
      })
    })
   })
  .catch ( (err) => {
     console.log('An error has ocurred: ', err)
  })


//Iteration 4

Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
.then(recipe => { console.log(`This recipe was updated: ${recipe.title} with this new value: ${recipe.duration}`)})
.catch(err => { console.log('An error happened:', err) });



//Iteration 5

Recipe.deleteOne({title:"Carrot Cake"})
.then(() => { console.log('Recipe was deleted')})
.catch(err => { console.log('An error happened:', err) });


//Iteration 6

process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
