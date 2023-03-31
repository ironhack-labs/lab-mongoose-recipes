const mongoose = require("mongoose")
const data = require('./data');
const Recipe = require("./models/Recipe.model");
const MONGODB_URI = 'mongodb://localhost:27017/recipes-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
   
  })
  .then(x => {
    // Run your code here, after you have insured that the connection was made
    const mauricioFavoriteDish = {
      title: "Spaghetti Carbonara",
      level: "Amateur Chef",
      ingredients: ["Eggs", "Spaghetti", "Guanciale", "Pepper", "Parmeggiano Regganio"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?resize=768,574",
      duration: 20,
      creator: "Leonardo di Mauricio",
      created: 1200,
    };
    return Recipe.create(mauricioFavoriteDish)
  
}
  )


  .then((response)=> {
    console.log(`Title: ${response}`);
    return Recipe.insertMany(data);
  })
  .then ((response)=>{
    data.forEach((recipe)=> {
      console.log(`${recipe.title}`);
    })
  })
  .then ((response)=> {
    //console.log(data);
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true});
  })

  .then ((message)=> {
    console.log("duration set to 100 successfully");
    console.log(message);
  })

  .then (()=> {

    return Recipe.deleteOne({title: 'Carrot Cake'});
  })
  .then ((message)=> {
    console.log("Carrot Cake deleted");
    console.log(message);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
  });