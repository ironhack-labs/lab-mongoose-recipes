const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { deleteOne } = require('./models/Recipe.model');

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
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    async function createRecipe() {
      const newRecipe=await Recipe.create({
        title: "Oyakodon",
        level: "Easy Peasy",
        ingredients: [
          "1/2 cup rice",
          "2 cup of water",
          "1 egg",
          "chicken 100g",
          "soy sauce",
        ],
        cuisine: "Asian",
        dishType: "main_course",
        image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        duration: 30,
        creator: "some japanese"
      })
      console.log(`reseta nueva guardado con 'exito`)
    }
    createRecipe()

    async function insertRecipe() {
        const newRecipe=await Recipe.insertMany(data)
        console.log(`resetas nuevas guardado con 'exito`)
        newRecipe.forEach(ele=>{
          console.log(ele.title)
        })
      }
    insertRecipe()
    
    async function updateDuration(filter,update){
        await Recipe.findOneAndUpdate(filter,update,{
        new:true
      })
      console.log(`cambiando la duracion`)
    }
    updateDuration({title : "Rigatoni alla Genovese"}, {duration : 100})

    async function deleteRecipe(filter){
      await Recipe.deleteOne(filter, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
      });
    }
    deleteRecipe({title:"Carrot Cake"})
  

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      )
      process.exit(0)
    })
  })
