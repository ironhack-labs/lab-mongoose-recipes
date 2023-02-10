const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app'

// Connection to the database "recipe-app"
mongoose
  .set('strictQuery', true)
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`)
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    // Recipe.create(data[0]).then( () =>{
    //   console.log(data[0].title)
    // })

    Recipe.insertMany(data).then(() => {
      Recipe.find({}, { title: 1, _id: 0 }, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
        }
      })

      let opts = { new: true }
      Recipe.findOneAndUpdate(
        { title: 'Rigatoni alla Genovese' },
        { duration: 100 },
        opts,
        (err, docs) => {
          if (err) {
            console.log(err)
          } else {
            console.log(docs)
          }
        }
      )
    })

   
  })
  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
