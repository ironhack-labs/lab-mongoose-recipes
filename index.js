const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const myRecipe ={
          title: "Tomato Sauce", 
          level: "Easy Peasy", 
          ingredients: ["tomatoes", "carrots", "onions", "celery", "garlic", "olive oil"],
          cuisine: "french",
          dishType: "sauce",
          duration: 15,
          creator: "Pauline", 
        }; 


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
    steps()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });



  // TRYING ASYNC 

  const newRecipe = ()=>{
    return Recipe.create(myRecipe).then((myRecipe) => {
    console.log(`The recipe was saved ${myRecipe.title}`)
  })
}

const insertManyData = () =>{
 return  Recipe.insertMany(data)
    .then((recipes) => {
      recipes.forEach((recipe) => {
        console.log(`${recipe.title}`)
      })
    })
  }

  const updateData = ()=>{
return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese"}, 
      { duration: 100},
      {new: true}
      )
      .then((dbresp) => {
        console.log(`Duration updated on recipe ${dbresp.title}`)
      })
  }

  const deleteData = () =>{
    return Recipe.deleteOne({
      title: 'Carrot Cake'
    })
        .then(recipe =>{
          console.log(`Recipe deleted!`);
  })
}

async function steps () {
  try{
    const result1 = await newRecipe (); 
    const result2 = await insertManyData (); 
    const result3 = await updateData(); 
    const result4 = await deleteData();
    mongoose.connection.close(() => {
    console.log("mongoose is now closed");
    }) 
  } 
  catch(err){
    console.log(err)
  }
}











// WITH THEN AND CATCH

// const newRecipe = Recipe.create({
//     title: "Tomato Sauce", 
//     level: "Easy Peasy", 
//     ingredients: ["tomatoes", "carrots", "onions", "celery", "garlic", "olive oil"],
//     cuisine: "french",
//     dishType: "sauce",
//     duration: 15,
//     creator: "Pauline", 
//   })
//   .then ((recipe)=>{
//     console.log(`The recipe was saved ${recipe.title}`);
//   }).catch((error)=>{
//     console.log(`An error occurred: ${error}`)
//   });

  // Iteration 3

  // Recipe.insertMany(data)
  //   .then((recipes) => {
  //     recipes.forEach((recipe) => {
  //       console.log(`${recipe.title}`)
  //     })
  //   })
  // })


    // Iteration 4

    // Recipe.findOneAndUpdate(
    //   { title: "Rigatoni alla Genovese"}, 
    //   { duration: 100},
    //   {new: true}
    //   )
    //   .then((dbresp) => {
    //     console.log(`Duration updated on recipe ${dbresp}`)
    //   })
    //   .catch((dbErr) => {
    //     console.log(dbErr)
    //   })


      // Iteration 5

      //  Recipe.deleteOne({ title: 'Carrot Cake'})
      //     .then(recipe =>{
      //       console.log(`Recipe deleted!`);

      // Iteration 6

          // mongoose.connection.close(() => {
          // console.log("mongoose is now closed");
          // })
          


    

