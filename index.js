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
  .then(x => {
     /*----Iteration 2 -----*/
    // Recipe.create({
    //   title: 'Maultaschen',
    //   level: 'Amateur Chef',
    //   ingredients: ['Speztler', 'potatoe', 'chicken broth', 'veggies'],
    //   cuisine: 'German',
    //   dishType: 'Dish',
    //   image: 'https://www.ediblecommunities.com/wp-content/uploads/2019/03/Maultaschen-500x375.jpg',
    //   duration: 90,
    //   creator: 'Herr Mannich',
    //   created: 'January 2020'
    // })
    /*----Iteration 3 -----*/
    // Recipe.create(data)
    Recipe.find({},{title: 1})
      .then(foods => {
        foods.forEach(food => {
          console.log(food.title)
        })
      })
      .catch(err => console.error(err))
    Recipe.updateOne({title: "Rigatoni alla Genovese"},{duration: 100})
      .then(foods => {
        console.log('update success')
      })
      .catch(err => console.error(err))
      Recipe.deleteOne({title: "Carrot Cake"})
        .then(foods => {
          console.log('succes')
        })
        .catch(err=> console.error(err))
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    mongoose.connection.close()    
  })
  .catch(err => console.error('Error connecting to mongo', err));
