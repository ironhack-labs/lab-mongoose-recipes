const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    Recipe.create(empanadasDePino)
    .then(recipe => {console.log('1.Recipe insert is call:',recipe.title);
      Recipe.insertMany(data)
      .then(recipe => {console.log('2.Recipes inserted');
        Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100},{new:true})
        .then(recipe => {console.log('3.updated!!:',recipe);
          Recipe.deleteOne({title:'Carrot Cake'})
          .then(recipe => {console.log('4.Recipe deleted');
            mongoose.connection
            .close()
            .then(() => console.log('5.Desconected'))
            .catch(err => console.log(err));
        })
        .catch(error => console.log('Error'));
      })
      .catch(error => console.log('error'));
    })
    .catch(error => console.log('An error happened', error));
    })
    .catch(error => console.log('An error happened', error));
  })
  .catch(err => console.error('Error connecting to mongo', err));

//ITEARATION 2:

  const empanadasDePino = {
    title:'Empanadas de Pino',
    level:'Amateur Chef',
    ingredients:['2 cucharadas de aceite','2 lb de carne picada','1/2 cucharadita de paprika','1/2 cucaradita de oregano seco','1 cucharadita de sal','pimienta a gusto','1/2 cucharadita de comino','1/2 taza de agua','1 cebolla grande picada en cubitos','1/2 taza de leche','1/2 tasa de agua','1 lb de harina','2 yemas','3oz de manteca','20 aceitunas','2 huevos duros'],
    cuisine:'Chilena',
    dishType:'Dish',
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRezdnwkciSiaU0FMHSw35iPzqqtINPRdMsg10gZNx7u7TPBdDAPw&s',
    duration:120,
    creator:'Maria'
  };

  // Recipe.create(empanadasDePino)
  // .then(recipe => console.log('Recipe insert is call:',recipe.title))
  // .catch(error => console.log('An error happened', error));

//ITEARATION 3:

  // Recipe.insertMany(data)
  // .then(recipe => console.log('Recipes inserted'))
  // .catch(error => console.log('An error happened', error));

//ITEARATION 4:

// Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100},{new:true})
// .then(recipe => console.log('updated!!:',recipe))
// .catch(error => console.log('error'));

//ITEARATION 5:

// Recipe.deleteOne({title:'Carrot Cake'})
// .then(recipe => console.log('Recipe deleted'))
// .catch(error => console.log('Error'));

//ITEARATION 6:

//mongoose.connection
//.close()
//.then(()=> {console.log('Desconected)})
//.cach(err => console.log(err));