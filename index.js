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
    useFindAndModify:false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then((result) => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Papas arrugadas con mojo',
      level: 'Easy Peasy',
      ingredients:['potatos', 'salt'],
      cuisine:'Canary',
      dishType:'snack',
      image:'',
      duration:30,
      creator:'GrandMa',
      created:'',
    })
    .then((result2)=>{
      console.log(result2.title)
    })


    Recipe.insertMany(data)
      .then((result3)=>{
        console.log(result3)
        Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100})
        .then((result4)=>{
          console.log(result4)
          Recipe.deleteOne({title:"Carrot Cake"})
          .then((result5)=>{
            console.log(result5)
            mongoose.connection.close()
            .then(()=>{
              console.log(`Server closed`)
            })
          })
        })
      })

  }) 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


