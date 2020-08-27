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
    //return self.connection.dropDatabase();
  })
  .then(() => {
    async function createOneRec(rec){
      const newRec = await Recipe.create(rec)
      console.log(newRec.title)
    }
    
    createOneRec({
      title: "Orange and Milk-Braised Pork Carnitas",
      level: "UltraPro Chef",
      ingredients: [
          "3 1/2 pounds boneless pork shoulder, cut into large pieces",
          "1 tablespoon freshly ground black pepper",
          "1 tablespoon kosher salt, or more to taste",
          "2 tablespoons vegetable oil",
          "2 bay leaves",
          "2 teaspoons ground cumin",
          "1 teaspoon dried oregano",
          "1/4 teaspoon cayenne pepper",
          "1 orange, juiced and zested"
        ],
      cuisine: "American",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
      duration: 160,
      creator: "Chef John"
    })
    
    async function creatMultiRec(arr){
      const newRec = await Recipe.insertMany(arr)
      for (let i = 0; i < arr.length; i++){
        console.log(newRec[i].title)
      }
    }
    
    creatMultiRec(data)
    
    async function updateRec(filter, update){
      await Recipe.findOneAndUpdate(filter, update, {
        new: true
      } )
      console.log("Upadate correct")
    }
    
    updateRec({title: "Rigatoni alla Genovese"}, {duration:100})

    async function deleteRec(filter) {
      await Recipe.deleteOne(filter)
      console.log("Recipe removed")
    }

    deleteRec({title: "Carrot Cake"})

    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log(
          "Mongoose default connection disconnected through app termination"
        )
        process.exit(0)
      })
    })
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });




