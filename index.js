const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch(err => {
    console.error('Error connecting to mongo', err);
  });

  Recipe 
    //poner los campos y valores aa creae
    function addNewRecipie(){
      const rcp = new Recipe({
        title: 'Pozole',
        level: 'UltraPro Chef',
        ingredients: ['5lt Agua', '2 Kg de Carne de Cerdo', '3 Kg Maiz','5 Lechugas', '1/2 Kg Oregano','3 Kg de limones','300 gr de sal','1 cda de acite','1/2 Kg de rabanos', '300 gr de chiles'],
        cuisine: 'Mexicana',
        dishType: 'Other',
        duration: '360',
        creator: 'La Abuela'

      })
      rcp
        .save()
        .then(create => console.log(`A new recipie has been created: ${create}!`))
  //   //.then (() => showCats())
        .catch(err => console.log(`Error while creating a new recipie: ${err}`));
    }
  
    addNewRecipie();
  
