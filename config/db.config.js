const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
})
.then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
})
.catch((error) => {
    console.error("Error connecting to the database", error);
})


process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log("Mongoose disconnected on app termination");
      process.exit(0);
    });
  });


