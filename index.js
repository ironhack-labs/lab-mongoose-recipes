const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({
  title: "Lemon pie2",
  level: "Easy Peasy",
  ingredients: ["lemon","butter","sugar","egg","flour","almond"],
  cuisine: "french",
  dishType: "Dessert",
  image: "https://www.google.com/search?biw=828&bih=579&tbm=isch&sa=1&ei=0GuwXKPeD6OMlwSO25KYDQ&q=lemon+pie&oq=lemon+pie&gs_l=img.3..0l6j0i7i30l4.890.1035..1370...0.0..0.76.151.2......1....1..gws-wiz-img.MCucMTMGImY#imgrc=haLEdr_07RASMM:",
  duration : 20,
  creator: "FCH",
})
  .then(arg => {
    console.log("created recipe!");
  })
  .catch(err => {
    console.error("no recipe", err);
  });

Recipe.insertMany(data)
.then(arg => {
  console.log("recipes added");
})
.catch(err => {
  console.log("fail, recipes no added", err);
});

Recipe.updateOne({title:"Rigatoni alla Genovese"}, {duration:100})
  .then(arg => {
    console.log("updated success");
  })
  .catch(err => {
    console.error("no update", err)
  })

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(arg => {
    console.log("update success");
  })
  .catch(err => {
    console.error("update failed", err);
  });

  Recipe.deleteOne({title:"Carrot Cake"})
    .then(arg => {
    console.log("delete success");
    })
    .catch(err => {
    console.error("delete failed", err);
    });

    process.on('SIGINT', () => {  
      mongoose.connection.close(() => { 
        console.log('Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
      })}); 