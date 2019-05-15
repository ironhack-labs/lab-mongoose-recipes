const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');

    addNewRecipe(`pizza`, `Easy Peasy`, [`tomato`,`cheese`, `masa`, `mushrooms`, `anchovis`], `Italian`, `Breakfast`, undefined, 30, `Marcello Criminally`, undefined)
    
        .then(pizza => {
          console.log(pizza.title)

            // Recipe.find({})
            //   .then((recipes)=> {console.log(`The recipes are:`, recipes)
            
              Recipe.insertMany(data)
              .then(recipes=> {
                
                recipes.forEach(recipe => console.log(recipe.title)) 
              
                Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
                .then(recipe=> {
                  console.log(`Update succesful`, recipe) 
                  Recipe.findOneAndDelete({title: 'Carrot Cake'})
                  .then(recipe => {
                    console.log(`Delete succesful`, recipe)
                    mongoose.connection.close()
                    .then(() => console.log('BYE!'))
                    .catch(err => console.log("Algo malo", err))
                }).catch(err => console.log("Algo malo", err))
              
              }).catch(err => console.log("Algo malo", err))
            
            }).catch(err => console.log("Algo malo", err))

            })
            .catch(err => console.log("Algo malo", err))
    })
    .catch(err => console.log("Algo malo", err))    


    const addNewRecipe = (Rtitle, Rlevel, Ringredients, Rcuisine, RdishType, Rimage, Rduration, Rcreator, Rcreated) => {

      const pizza = new Recipe({ title: Rtitle, level: Rlevel, ingredients: Ringredients, cuisine: Rcuisine, dishType: RdishType, image: Rimage, duration:Rduration, creator: Rcreator, created: Rcreated})
      
      return pizza.save()
    }



  /* const addNewRecipe = (Rtitle, Rlevel, Ringredients, Rcuisine, RdishType, Rimage, Rduration, Rcreator, Rcreated) => {

    const pizza = new Recipe({ title: Rtitle, level: Rlevel, ingredients: Ringredients, cuisine: Rcuisine, dishType: RdishType, image: Rimage, duration:Rduration, creator: Rcreator, created: Rcreated})
    
    pizza.save()
      .then(pizza => console.log(`recipe saved!`, pizza))
      .catch(err => console.log(`Error`, err))

  }

  const showRecipe = ()=> {

    Recipe.find({})
      .then(recipes=> console.log(`The recipes are:`, recipes))
      .catch(err => console.log(`Error`, err))
  }

  Recipe.insertMany(data)
    .then(recipes=> console.log(`The recipes are:`, recipes))
    .catch(err => console.log(`Error`, err)) */

  

  // addNewRecipe(`pizza`, `Easy Peasy`, [`tomato`,`cheese`, `masa`, `mushrooms`, `anchovis`], `Italian`, `Breakfast`, undefined, 30, `Marcello Criminally`, undefined)

  // Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
  //   .then(recipes=> console.log(`Update succesful`, recipes))
  //   .catch(err => console.log(`Error`, err))
  
  // Recipe.deleteOne({name: 'Carrot Cake'})
  //   .then(recipes=> console.log(`Update succesful`, recipes))
  //   .catch(err => console.log(`Error`, err))

  // mongoose.connection.close(()=> {
  //   console.log('BYE!')
  // })
