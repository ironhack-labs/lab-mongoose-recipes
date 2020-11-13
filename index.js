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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
     const recipeFriedEggs = 
    {
      title: "Fried eggs with french fries",
      level: "Amateur Chef",
      ingredients: [
        "2 potatoes",
        "1 cup olive oil",
        "4 eggs",
        "water",
        "salt",
      ],
      cuisine: "worldwide",
      dishType: "main_course",
      image: "https://www.hogarmania.com/archivos/201703/huevos-fritos-patatas-668x400x80xX.jpg",
      duration: 15,
      creator: "Karlos Arquiñano",
    }
    
    Recipe.create(recipeFriedEggs)
    .then((result)=>{
      console.log(`Recipe created: ${result.title}`)
    })
    .catch((err)=>{
      console.log(err)
      res.send(err)
    })

    Recipe.insertMany(data)
    .then((result) => {
      result.forEach((result) => {
        console.log(`Recipe imported from data: ${result.title}`)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  
    .then(()=>{
      Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration: 100}, {new: true})
      .then((result)=>{
        console.log(`Duration updated to: ${result.duration}`)
      })
      .catch((err)=>{
        console.log(err)
      })
    })

    .then(()=>{
      Recipe.deleteOne({title: 'Carrot Cake'})
      .then((result)=>{
        console.log(`The selected recipe has been removed: ${result}`)
      })
      .catch((err)=>{
        console.log(err)
      })
    })
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // mongoose.connection.close()
  // .then(()=>{
  //   console.log('closed')
  // })
  // .catch((err)=>{
  //   console.log(err)
  // })
