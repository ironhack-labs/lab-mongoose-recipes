const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'

const data = require('./data'); // Import of the data from './data.json'



const MONGODB_URI = 'mongodb://localhost:27017/recipe-index';

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
    return self.connection.dropDatabase(); // auto delete everything to avoid doublons
  })

  .then(() => {

    Recipe.create({
      title: "Tortilla",
      level: "Easy Peasy",
      ingredients: "patatoes, eggs, oliv oil, onion, salt, peper",
      cuisine: "Spanish",
      dishType: "main_course",
      image: "https://www.cocinaabuenashoras.com/files/tortilla-de-patatas-espanola-768x576.jpg",
      duration: 25,
      creator: "Manish",
      created: "",
    })

    Recipe.insertMany(data) 
    .then(recipe => { recipe.map(item => { console.log(item.title); }); }) 
    .catch(error => { console.log(error); });

      // Recipe.insertMany(data)
    
    // })
      // .then((res) => {
      //   data.forEach((recipe)=> console.log(recipe.title));
      // })

  
      Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, { $set: {duration: 100}})
        .then(success => {
          console.log ("updated")
        })


      Recipe.deleteOne({title: "Carrot Cake"})
        .then(success => {
          console.log ("delete")
        })
          

      mongoose.connection.close;

  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  })


          
