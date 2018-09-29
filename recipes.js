const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: {
    type: Array
  },
  cousine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg."
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("data", recipeSchema);

function saveAll() {
  Recipe.insertMany(data)
    .then(res => {
      console.log(`Se salvaron ${res}`);
    })
    .catch(error => {
      console.log(error);
    });
}

Recipe.findByIdAndUpdate("5bafc24d449c135e682e65e0", {
  $set: { duration: 100 }
})
  .then(res => {
    console.log(`Success update`);
    closeConnection();
  })
  .catch(error => {
    console.log(error);
  });

Recipe.findByIdAndRemove("5bafc24d449c135e682e65df")
  .then(res => {
    console.log(`Success removal`);
  })
  .catch(error => {
    console.log(error);
  });

function closeConnection() {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
}