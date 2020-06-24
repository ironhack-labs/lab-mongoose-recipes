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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => Recipe.create({title: "Cachopo", cuisine: "Mordor"}))
  .then(recipe => console.log(`${recipe.title} created`))
  .then(() => Recipe.create(data))
  .then(newRecipe => {newRecipe.forEach(elm => console.log(`${elm.title} added`))})
  .then(() => Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration:100}, {new:true}))
  .then(timedRecip=>console.log(`${timedRecip.title} duration is changed to ${timedRecip.duration}`))
  .then(()=> Recipe.findOneAndRemove({title:'Carrot Cake'}))
  .then(delRecip=>console.log(`${delRecip.title} has been eliminated`))
  .then(()=>mongoose.connection.close())
  .catch(error => console.error('Error detected', error))
.catch(error => {
  console.error('Error connecting to the database', error);
});




  
  // .then(() => {
  //   Recipe.create({
  //       title: "Cachopo",
  //       cuisine: "Mordor"
  //     })
  //     .then((recipe) =>
  //       console.log(recipe.title))
  //     .then(() => {
  //       Recipe.create(data)
  //         .then((recipe) => {
  //           recipe.forEach((element) => console.log(`${element.title} added`))
  //         })
  //     .then(() => {
  //           Recipe.findOneAndUpdate({
  //               title: "Rigatoni alla Genovese"
  //             }, {
  //               duration: 100
  //             })
  //             .then(recipe => {
  //               console.log(`${recipe.name} duration is updated to ${recipe.duration}`)
  //             })
  //         })
  //     .then(() => {
  //           Recipe.findOneAndRemove({
  //               title: "Carrot Cake"
  //             })
  //             .then(() => {
  //               console.log("Recipe deleted")


  //               mongoose.connection.close()
  //             })
  //         })
  //     })
  // })
  