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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  .then(() => {
  Recipe.create({
  title:"tandoori Kip",
  level: "UltraPro Chef",
  ingredients : ["Chicken", "tandoori masala", "kruiden"],
  cuisine:"Indian",
  dishType: "main_course",
  image : "",
  duration: "45",
  creator:"chef",
})
.then(recipe => console.log(`Recipe${Recipe.title}`))
    .catch(err => console.log(`Error while creating a new cat: ${err}`))
  })

    Recipe.insertMany(data)
    .then( (dataInput) => {
      return Recipe.find()
        .select("title")
        .then(checkData => { console.log('The recipes are ', checkData) })
    })
    .catch(err => console.log(`Error while creating a new cat: ${err}`))

    .then(() => {  
      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then((updateData) => {
        console.log(`the updateRecipe${ updateData.title}`)
      })
      .catch((err) => {
        console.log(`Error while creating a new cat: ${err}`)
      })
    })

    .then(() => {
    Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then((updateData) => {
        console.log(`the updateRecipe${ updateData.title}`)
      })
      .catch((err) => {
        console.log(`Error while creating a new cat: ${err}`)
      })
    })

    .then(() => {
      Recipe.deleteOne({title: "Carrot Cake"})
      .then((deleteData) => {
        console.log(`the deletedRecipe${deleteData.title}`)
      })
      .catch((err) => {
        console.log(`Error while creating a new cat: ${err}`)
      })
    })

    .then(() => {
      mongoose.connection.close()
      .then(() => {
        console.log(`mongoose is closed`)
      })
      .catch(() => {
        console.log(`Error while creating a new cat: `)
      })
    })