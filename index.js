const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipe-app-dev"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

// Create


Recipe.create({
  title: "Kuku Sabzi",
  level: "Easy Peasy",
  ingredients: ["Herbs","Walnuts","Dried barberries","Eggs","Oil","Baking powder"],
  cuisine: "Persian",
  dishType:"Other",
  image:"https://www.ahueats.com/wp-content/uploads/2016/03/Kuku-Sabzi-Persian-Herb-Fritatta-1.jpg",
  duration:60,
  creator: "Azadeh",
  created: "2020-03-12"
})
.then((recipe)=>{
  console.log(`The recipe ${recipe.title} is created!`);
})
.catch((error)=> {
  console.log("ERROR in creating",error);
});

// Insert many
setTimeout(()=>{
  Recipe.insertMany(data)
.then((recipes)=>{
  recipes.forEach((recipe)=>{
    console.log("Title: ",recipe.title);
  });
})
.catch((error)=>{
  console.log("ERROR in inserting many: ", error);
});
},2000)


// Update
setTimeout(()=>{
  Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:"100"})
.then((recipe)=>{
  console.log(`Duration of recipe for ${recipe.title} was successfully changed.`);
})
.catch((error)=>{
  console.log("ERROR in updating one",error);
});
},3000)


//Delete
setTimeout(()=>{
  Recipe.deleteOne({title:"Carrot Cake"})
.then(()=>{
  console.log("Successfully Deleted!");
})
.catch((error)=>{
  console.log("ERROR in deleting: ", error);
});
},4000)


// Closes the connection

setTimeout(()=>{
  mongoose.connection.close()
.then(() => console.log(`Connection to is Mongo DB closed!`))
.catch(err => console.error('Error', err));
},6000)
