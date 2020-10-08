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
    let firstIteration = Recipe.create(data[0])
     firstIteration
        .then((res)=>{
              console.log("data was sent",res)
    })
        .catch(()=>{
              console.log("failure")
    })
  
  
  let secondIteration = Recipe.insertMany(data)
    secondIteration
        .then((res)=>{
              res.filter((res)=>{ console.log(res.title)})
      
               console.log("data was sent")
    })
        .catch(()=>{
              console.log("failure")
      
    })
  


  Promise.all([firstIteration,secondIteration])

  .then(()=>{
    let thirdIteration =Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{$set:{duration:100}})
  thirdIteration
          .then((res)=>{
                console.log("data was sent",res)
               })
          .catch(()=>{
                console.log("failure")
               })
    let fourthIteration =  Recipe.deleteOne({title:'Carrot Cake'})
               fourthIteration
                    .then((res)=>{
                            console.log("data was sent",res)
                         })
                   .catch(()=>{
                            console.log("failure")
                         })
                       })

         Promise.all([thirdIteration, fourthIteration])
          .then(() => {
            mongoose.connection.close()
            . then(() => {

            })
          })              
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  