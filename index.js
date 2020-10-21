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
    //Iteracion 2

    (async () => {

      // Iteracion 2

      try {
        const recetas = await Recipe.create({
          title: "Guisantes con jamón",
          level: "Easy Peasy",
          ingredients: ["guisantes", "cebolla", "jamón serrano", "harina de trigo"],
          cuisine: "Española",
          dishType: "main_course",
          image: "https://i.blogs.es/1d7e53/guisantes_jamon-copia/1024_2000.jpg",
          duration: 15,
          creator: "Alberto",
        });
        console.log(`Esta receta se llama ${recetas.title}`); 

        //Iteracion 3

        let multiRecipes = await Recipe.insertMany(data)
        for(i=0; i<multiRecipes.length; i++)
        console.log(`${data[i].title}`);

        //iteracion 4

        const encontrar = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration:100}, {new: true });
        console.log(encontrar);

        //Iteracion 5

        const borrar = await Recipe.deleteOne({title: "Carrot Cake"});
        console.log(borrar);
      } catch(error){
        console.log(error.message)
      }

      //Iteracion 6

      mongoose.connection.close();

    })();

  

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
   
 