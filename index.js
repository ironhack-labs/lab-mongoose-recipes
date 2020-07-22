const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

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
  .then(async () => {
    let res = await Recipe.create({title:'efwef'})
    console.log(res.title)
    res = await Recipe.insertMany(data)
    res.forEach((eachRecipe)=>{
       console.log(eachRecipe.title)
     })
    res = await Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100}, {new:true})
      console.log('Rigatoni duration updated to 100');
    res = await Recipe.deleteOne({title: "Carrot Cake"},(err)=>{
      if (err)
        console.log('error')
      console.log('Item successfully deleted')  
  })
  mongoose.connection.close()
})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

