const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })

      Recipe.collection.drop()

      .then(x => { 
            Recipe.create({
              title: 'New York Cheese Cake',
              level: 'Amateur Chef',
              ingredients: ['Cheese', 'Jam', 'Cookies', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
              cuisine: 'Americam',
              dishType: 'Dessert',
              image: 'https://www.onceuponachef.com/images/2017/12/NY-Cheesecake-760x574.jpg',
              duration: 60,
              creator: 'Chef LePapu'})

          .then(x => {
            Recipe.insertMany(data)
            
            .then(x =>{
              Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
                .then(x =>console.log(x,'hemos cambiado la duracion'))

                .then(x =>{
                  Recipe.deleteOne({title: 'Carrot Cake'})
                    .then(x =>console.log(x,'hemos borrado la tarta'))
                })
                .catch(err => console.log('error', err))
    
              })

            .catch(err => console.log('error', err))
          })

          .catch(err => console.log('error', err))

      })
      .catch(err => console.log('error', err))

   
 
   

    
  










    