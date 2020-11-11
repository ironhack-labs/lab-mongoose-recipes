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

    return Recipe
      .create({ title: "Arroz", level: "Easy Peasy", ingredients: ["arroz"], cuisine: "make rice in water", dishtype: "main_course", duration: 32, image: "", creator: "Javier Fernández", created: 2020 - 11 - 11 })

  }
  )

  .then(() => {
    return Recipe
      .create(data)
      .then(data => {
        data.forEach(elm => {
          console.log(`El nombre de las recetas es ${elm.title}`)
        })

      }) 
  }

  )

  .then(() => {
    return Recipe
      .updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  }
  )

  .then(() => {
    return Recipe
      .deleteOne({ title: "Carrot Cake" })
  }
  )

  .then(() => {

    return mongoose.connection.close(() => {
      console.log("Conexión cerrada")
    }

    )
  }
  )


  .catch(error => {
    console.error('Error connecting to the database', error);
  });