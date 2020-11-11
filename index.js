const mongoose = require('mongoose');
// const data = require('./data.json')

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
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    // return self.connection.dropDatabase();
  })
  .then((result) => {
    // Recipe.create(
    //   {
    //   title: 'Il cafetino',
    //   level: 'UltraPro Chef',
    //   ingredients: ['cafetino', 'water'],
    //   cuisine: 'Italian',
    //   dishType: 'drink',
    //   image: "https://www.google.com/search?q=cafe&sxsrf=ALeKk03T5a8IAAVBqwqyTMLcg4Qwd2FsXQ:1605114883512&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiM4dHz_vrsAhXMN8AKHZWWAgYQ_AUoAnoECCIQBA&biw=1920&bih=937#imgrc=qOiuRnY7WG0p-M",
    //   duration: 10,
    //   creator: 'Elon Musk',
    //   created: 1995-05-28,
    //   }
    // )
    // .then((result)=>{
    //   console.log(result)
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })

    // Recipe.insertMany(data)
    // .then((result)=>{
    //   console.log(result)
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })

    // Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
    // .then((result)=>{
    //   console.log(result)
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })

    // Recipe.deleteOne({title: 'Carrot Cake'})
    // .then((result)=>{
    //   console.log(result)
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
  
  mongoose.disconnect(()=>{
    console.log('Mongoose succesfuly disconnected!')
  })



