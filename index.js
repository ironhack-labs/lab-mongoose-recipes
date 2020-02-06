const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'


// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


  let recipe1 ={
    title: "hummus",
    level: "Easy Peasy",
    ingrediants: ["h","u"],
    cuisine :" Syrian",
    dishType: "Snack",
    duration:2,
    creator:"tarek",
  };

//  const promise1= 
 Recipe.create( recipe1 , (err, result) => {
    if (err) console.log(err);
    else console.log('Document inserted', result);
  }
);

// const promise2= 
Recipe.insertMany(data)
  .then( (data) => { 
    data.forEach((recipe)=>{console.log(recipe.title) } ) } )
  .catch(err=> console.log(err))

  // const promise3= 
  Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration:  100 } })
  .then((result) => {
    console.log('', result)
  
    mongoose.connection.close();
  })
  .catch(err => console.log(err));

  
  // const promise4=
   Recipe.deleteOne({ title:'Carrot Cake'})
  .then( (result) => console.log('Success deleting document', result))
  .catch(err => console.log(err));

  // Promise.all([promise1, promise2, promise3, promise4])
  // .then((result) => {
  //   mongoose.connection.close();
  // }).catch((err) => {
  //   console.log("nothing");
  // });