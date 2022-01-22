const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/recipe-app", {
    useUnifiedTopology: true,
  })
  .then((db) => console.log(`connected to db ${db.connections[0].name}`))
  .catch((err) => console.log("error is", err));

//   add closing the connection here?
