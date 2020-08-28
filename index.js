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
    // Run your code here, after you have insured that the connection was made
    //Iteration 1
    Recipe.create( {
      title: "LeafRolls Turkish",
      level: 'Amateur Chef',
      ingredients: ["rice","onion","tomatos","parsley","olive oil","black pepper","grape leaves"],
      cuisine: "Turkish",
      dishType: "other",
      image: "",
      duration: 40,
      creator:"Mahmut Sarcan",
    })
    .then(newRecipe=> console.log(`New recipe:${newRecipe.title}`)
    )
    .catch(err=>console.log(err));

    //Iteration 3
    Recipe.insertMany(data)
    .then((newRecipe)=> newRecipe.forEach((recipe)=>{
      console.log(recipe);
    }))
    .catch((err)=> console.log(err));


    //Iteration 4
    Recipe.findOneAndUpdate(
      {title:'Rigatoni alla Genovese'},
      {duration:100},
      {new:true}
    )
    .then((newRecipe)=> console.log("Updated successfully!"))
    .catch((err)=> console.log(err));

    //Iteration 5
    Recipe.deleteOne(
      {title:'Carrot Cake'}
    )
    .then(()=> console.log(`Deleted successfully!`))
    .catch((err)=> console.log(`Could not delete recipe:${err}`));

   
    
  })
   //Iteration 6
   mongoose.disconnect()
   .then((end)=>{
     console.log('Mongoose is disconnected')
   })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
    
