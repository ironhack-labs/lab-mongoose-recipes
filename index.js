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
    // Before adding any recipes to the database, let's remove all existing ones

    return Recipe.deleteMany()
  })

  //------------------Add a signle document in the DB-------------------
  .then(() => {
    Recipe.create({ title: 'CurryWurst', cuisine: 'German' })
  })

  //------------------ Add multiple documents in the DB--------------
  .then((findResults) => {
    // let recipes = [{ title: 'Rigatoni alla Genovese', cuisine: 'Italian', duration: 220 }, { title: 'Orange and Milk-Braised Pork Carnitas', cuisine: 'American' }, { title: 'Carrot Cake', cuisine: 'International' }, { title: 'Chocolate Chip Cookies', cuisine: 'French' }, { title: 'NY Cheese Cake', cuisine: 'Desert' }]
    return Recipe.insertMany(data)

      // //---------------------update-------------------------
      .then((findResults) => {
        findResults.forEach((elem) => {
          console.log(elem.title)
        })
        return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
          .then(() => {

            console.log('success!!')
          })
      })
  })

  // Delete the cake!!!   
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => {
        console.log('yeaaaaaaaaahhhhhhhhhhhhhhhhhhh!!!!')

      })

  })


  .then(() => {
    return mongoose.disconnect()
      .then(() => {
        console.log(mongoose.connection.readyState);
      })

  })



  // Run your code here, after you have insured that the connection was made


  .catch(error => {
    console.error('Error connecting to the database', error);
  });


// mongoose.connection.close()
