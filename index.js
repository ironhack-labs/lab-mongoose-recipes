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

  // Recipe
  // .insertMany(data)
  // .then(dbRes => {
  //   console.log(dbRes)
  // })
  // .catch(err => {
  //   console.log(err)
  // })

// Recipe.create({
//   title: "Salsa",
//   level: "Easy Peasy",
//   ingredients: ["tomatoes", "jalapeño", "onions"],
//   cuisine: "American",

// }).then(dbRes => {
//   console.log(dbRes)
// }).catch(err => {
//   console.log(err)
// })



// const newData = {
//   duration: '100'
// }

Recipe
.findByIdAndUpdate(
  "5e398d6d5c74817042152932", newData, { new: true })
  // .updateOne is better in this specific case, will work on all machines

  .then(dbRes => {
      console.log(dbRes)
    }).catch(err => {
      console.log(err)
    });


Recipe
.deleteOne({ _id: "5e398d6d5c74817042152931"})
  .then(dbRes => {
    console.log("Success! You deleted a recipe.")
  }).catch(err => {
    console.log(err)
  })

  mongoose.connection
    .close()
    .then(x => {
      console.log("Server closed.")
    })
    .catch(err => {
      console.log(err)
    })


// Tank.deleteOne({ size: 'large' }, function (err) {
//   if (err) return handleError(err);
//   // deleted at most one tank document
// });


  //   User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
  //     if (err) return res.status(500).send("There was a problem updating the user.");
  //     res.status(200).send(user);
  //   });
  // });


// kennels.findByIdAndUpdate(
//   { _id: "5db6b26730f133b65dbbe459" },
//   { breed: "Great Dane" },
//   function(err, result) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   }
// );


//Notes from Franck:
// Model.insertMany
//  	- can send in an array of objs 
//  	-.create bypasses middleware fns, .insertMany doesn’t

// Up until iteration 2, when it says it should be unique,
// Comment out fn in iteration 2 so won’t say it’s already def’d.