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
    
//     Recipe.create({

//       title: "Magic Brownies",
//       level: "Amateur Chef",
//       ingredients: ["chocolate", "sugar", "some suspicious plant made butter", "milk"],
//       cuisine: "Dutch",
//       dishType: "snack",
//       image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fupv265.wordpress.com%2F2016%2F11%2F15%2Fefectos-de-los-brownies-de-marihuana%2F&psig=AOvVaw0V1DHGQ2GyT7T_WEHMMBvd&ust=1605257344313000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiC8-PP_OwCFQAAAAAdAAAAABAJ",
//       duration: 1,
//       creator: "Unknown",
//       created: "1750-01-01"

//     })

//     .then((result)=>{
//       console.log(result);
//     })
// .catch((error)=>{
//   console.log(error);
// })

    // Recipe.insertMany(data)
    // .then((result)=>{
    //   console.log(result);
    // })

    // .catch((error)=>{
    //   console.log(error);
    // })


  //   Recipe.updateOne({title: "Chocolate Chip Cookies}, {level: "Easy Peasy"})
  // .then((result)=>{
  //     console.log(result);
  // })
  // .catch((error)=>{
  //     console.log(error);
  // });

  // Recipe.deleteOne({title: "Chocolate Chip Cookies})
  //         .then((result)=>{
  //           console.log(result);
  //         })
  //         .catch((error)=>{
  //           console.log(error);
  //         });


        

  })

  
  
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

  mongoose.disconnect(()=>{
    console.log("Disconnected from the database");
  });