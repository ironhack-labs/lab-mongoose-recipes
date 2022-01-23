const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/recipe-app", {
  useNewUrlParser: true,
})
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to the database', err))
  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log("Mongoose disconnected on app termination");
      process.exit(0);
    });
  });

