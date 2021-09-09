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
  }).then(()=>{
    Recipe.insertMany(data, function(err,docs){
      if(err){
        return console.log(err)
      }else{
        console.log(console.log(docs.map(element=>element.title)))
      }
    })
    
   
  })
  .then(()=>{
    Recipe.create({title:'my-rice', level:'Easy Peasy', ingredients:['rice','onion','garlic','oil'], cuisine:'Asian', dishType:'main_course',duration:30}).then(result=>{
      console.log(result.title)
    })
  }).then(()=>  Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{$set:{duration:100}},{new: true},(err,doc)=>{
    if(err){
      console.log(err)
    }else{
      console.log('success')
    }}
    ))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  