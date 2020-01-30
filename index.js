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
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err))
  .then(async x=>{
     //iteracion2
    let two= await Recipe.create({
      title:"Sandwich",
      level:"Easy Peasy",
      ingredients:['Bread','Jam','Cheese'],
      cuisine:"Fast food",
      dishType:"Snack",
      image:'https://s3.eestatic.com/2016/03/21/cocinillas/Cocinillas_111250498_116247584_1706x960.jpg',
      duration:5,
      creator:'Alejandra Ochoa',
      created:Date.now()
    })
    console.log(two.title)
  
    //iteracion 3
    let three= await Recipe.create(data)
    three.forEach(recipe=>console.log(recipe.title))
  
  
    //iteracion 4
    let four= await Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:100},{new:true})
    .then(recipe=>console.log("Update done!"))
    .catch(err=>console.log(err))
  
    //iteracion 5
    let five = await Recipe.deleteOne({ title: 'Carrot Cake' }, function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
    });

    //iteracion 6 
    let six= await mongoose.connection.close()
  })


  