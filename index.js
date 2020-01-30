const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); 
const data = require('./data.js'); 


mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

  const recipe1 = {
    title: "Cooking Plan",
    level: "Amateur Chef",
    ingredient: ["mango, pineapple, tomato"],
    cuisine: "Française",
    dishType: "Breakfast",
    // image: "default",
    duration: 23,
    creator: "Mehmet",
    // created : "today",
  }

//  Recipe.create(recipe1);
 
// Recipe.insertMany(
//   data,
// )

Recipe.find(
  {title:1, _id:0}
)

Recipe.find({}).sort({title:-1})
  .then(user => {
    user.forEach(u => console.log(u.title))
  })
  .catch(error => {
    console.log(error)
  });


  Recipe.updateMany({ title:"Rigatoni alla Genovese" }, { duration: 100 })
  .then(results => {
    console.log("success")
  })
  .catch(error => {
    console.log(error)
  });

  Recipe.deleteMany({ title: "Carrot Cake" })
  .then(success => {
    console.log("youhou")
  })
  .catch(error => {
    console.log(error)
  });




