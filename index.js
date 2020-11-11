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
    // return self.connection.dropDatabase();
  })
  .then(() => {
  //   Recipe.create(
  //     {
  //       title: 'Il bocadillo',
  //       level: 'Easy Peasy',
  //       ingredients: ['bread', 'tomato', 'jam', 'cheese'],
  //       cuisine: 'Spanish',
  //       dishType: 'snack',
  //       image: "https://www.enriquetomas.com/es/blog/wp-content/uploads/2018/02/hacer-el-mejor-bocadillo-de-jamon-e1519833440102-1280x720.jpg",
  //       duration: 3,
  //       creator: 'Steve Jobs',
  //       created: '1986-05-04'
  //     }
  //   )
  // .then((result)=>{
  //     console.log(result);
  // })
  // .catch((err)=>{
  //     console.log(err);
  // })

  // Recipe.insertMany(data)
  //       .then((result)=>{
  //         console.log(result);
  //         })
  //       .catch((err)=>{
  //         console.log(err);
  //       });

  // Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
  // .then((result)=>{
  //     console.log(result);
  // })
  // .catch((err)=>{
  //     console.log(err);
  // });

    // Recipe.deleteOne({title: "Carrot Cake"})
    //       .then((result)=>{
    //         console.log(result);
    //       })
    //       .catch((err)=>{
    //         console.log(err);
    //       });

    
  })
  // .then().connection.close(()=>{
  //   console.log('Mongoose default connection disconnected through app termination');
  //   // process.exit(0);
  // })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

  mongoose.disconnect(()=>{
    console.log('Disconnected!');
  });
