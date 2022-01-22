const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/recipes-app", {
    useNewUrlParser: true,
  })
  .then(x =>{
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    // Before adding any recipes to the database, let's remove all existing ones
  })
  .catch((err) => console.error("Error connecting to mongo", err));

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
