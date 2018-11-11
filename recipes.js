const mongoose = require("mongoose");
const Recipe = require("./recipe.js");
const data = require("./data.js");

mongoose.connect("mongodb://localhost/recipeApp", { useCreateIndex: true, useNewUrlParser: true})
  .then(() => {console.log("Connected to Mongo!");})
  .catch(err => {console.error("Error connecting to mongo", err);
});

const myRecipe = {
  title: "Tortilla de patata",
  level: "Amateur Chef",
  ingredients: [
    "500g new potato",
    "1 onion(preferably white)",
    "150ml extra-virgin olive oil",
    "3 tbsp chopped flat-leaf parsley",
    "6 eggs"
  ],
  cuisine: "Spanish",
  dishType: ["Dish"],
  image: "https://sevilla.abc.es/gurme//wp-content/uploads/2016/06/tortilladepatatas-960x512.jpg",
  duration: 60,
  creator: "La Abuela"
};

const createRecipe = (datObj, num) => {
  num ? (num = num + " ") : (num = "");
  const recipe = Recipe.create({
    title: num + datObj.title,
    level: datObj.level,
    ingredients: datObj.ingredients,
    cuisine: datObj.cuisine,
    dishType: datObj.dishType,
    image: datObj.image,
    duration: datObj.duration,
    creator: datObj.creator
  });
  return recipe
    .then(doc => console.log(`Created independent recipe -> ${doc.title}`))
    .catch(err => console.log(`Create failed`, err));
};

createRecipe(myRecipe);


      //when i use this method the promise doesn't work correctly, updateRecipe and removeRecipe works perfectly, but showAllRecipes doesn't
const manyRecipes = (datArr) => {
  let proms = [];
  for (let i = 0; i < datArr.length; i++) {
    proms.push(createRecipe(datArr[i], i + 1));
    //if we are using this method we must include the i num in the title of the recipe in the following methods (update and remove)
    //i only included i num to check the promises and see the order in which the recipes display
  }
  //console.log(proms);
  return proms;
};

      //if i use this method, the promises work wrong, showAllRecipes is executed first, updateRecipe isn't working
      //and removeRecipe works (but only in compass app), when i show the data through console, it's display wrongly
// const manyRecipes = (datArr) => {
//   let consoles = [];
//   const recipes = Recipe.create(datArr); //if use the insertMany method, the other functions (update, remove) aren't working
//   recipes
//     .then(rec => {
//       rec.forEach((e, i) => {
//         consoles.push(console.log(`Created recipe ${i+1} -> ${e.title}`));
//       })
//     }).catch(err => console.log("Many recipes failed", err));
//   return consoles;
// };

const updateRecipe = (query, change) => {
  return Recipe.updateOne(query, change)
    .then(res => {console.log("Update ok", res)})
    .catch(err => {console.log("Update failed", err)});
};

const removeRecipe = (query) => {
  return Recipe.deleteOne(query)
    .then(res => {console.log("Remove ok", res)})
    .catch(err => {console.log("Remove failed", err)});
};

const showAllRecipes = () => {
  return Recipe.find().then(recs => {
    console.log('HERE ARE ALL THE RECIPES -->');
    recs.forEach(rec => {
      console.log("Show recipe: ", rec.title);
    });
  });
};


Recipe.collection.drop();

// const actions = () => {
  //   manyRecipes(data);
  //   updateRecipe({title: "4 Rigatoni alla Genovese"}, {duration: 100});
  //   removeRecipe({title: "3 Carrot Cake"});
  // };
  // const pr = actions();

const pr = manyRecipes(data);
Promise.all(pr).then(() => {
  //remove the title nums when using the second manyRecipes method
  updateRecipe({title: "4 Rigatoni alla Genovese"}, {duration: 100});
  removeRecipe({title: "3 Carrot Cake"});
  console.log("UPDATED");
  showAllRecipes().then(() => mongoose.disconnect());
});









//TESTING NOT VALID---------------------------------------
// const manyRecipes = (datArr) => {
//   let proms = [];
//   for (let i = 0; i < datArr.length; i++) {
//     proms.push(createRecipe(datArr[i], i + 1));
//   }
//   console.log(proms);
//   return Recipe.insertMany(proms)
//     .then(results => {
//       const {recipes} = results;
//       return recipes.map(rec => `Created recipe -> ${rec}`)})
//     .catch(err => {console.log("Many recipes failed", err)});
// };

// const manyRecipes = (datArr) => {
//   const recipes = Recipe.insertMany(datArr);
//   return recipes
//     .then(rec => {
//       rec.forEach((e, i) => {
//         console.log(`Created recipe ${i} -> ${e.title}`);
//       });
//     })
//     .catch(err => console.log("Many recipes failed", err));
// };
//---------------------------------------------------------
