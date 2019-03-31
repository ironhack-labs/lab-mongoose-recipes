const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/recipe-models.js');
const MONGODB_URI = 'mongodb://localhost:27017/recipeApp';


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  Recipe.create(data)//revisar este data
  .then (() => console.log(`Updated :)`))
  .catch (() => console.error(`NOT UPDATED :(`))


  // Recipe.insertMany([, ...data])//revisar este data
  // .then (() => console.log(`Sucess varias metidas`)
  // console.info 
  // )
  // .catch (() => console.error(`NOT UPDATED :(`))


//   .then (() => {
//   console.info(`iteration5++++++++++++`),
//   return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 }}),
// })

.then( () => {
  console.log("Success cambiada la mierda")
  return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$set: {duration: 100}})
  //darle un ojo
})
.then( () => {
  console.log("Success a la mierda el carrot cake")
  return Recipe.deleteOne({title: "Carrot Cake"})
})
.then( () => {
  console.log("conex cerrada")
  return mongoose.connection.close()
})
.catch(error => console.error(error));

//   const mongoose = require('mongoose');
// const Recipe = require('./models/recipe-models');
// const Schema   = mongoose.Schema;
// const data = require('./data.js');
// const MONGODB_URI = 'mongodb://localhost:27017/recipeApp';

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
//   .then(() => console.log(`Sucessfully connected to the database ${MONGODB_URI}`))
//   .catch(err => console.error(`An error ocurred trying to connect to the database ${MONGODB_URI}`, err));

// Recipe.create(data[0])
//   .then(recipe => console.log("Success"))
//   .catch(error => console.log(error))

// Recipe.insertMany([, ...data])
//   .then(recipe => console.log("Success"))
//   .then( () => {
//     return Recipe.find({}, {title:1, _id: 0})
//       .then(recipe => console.log(recipe))
//   })
//   .then( () => {
//     return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$set: {duration: 100}})
//       .then(recipe => console.log("Success"))
//   })
//   .then( () => {
//     return Recipe.remove({title: "Carrot Cake"})
//       .then(recipe=> console.log("success"))
//   })
//   .then(() => mongoose.connection.close())
//   .catch(error => console.log(error))