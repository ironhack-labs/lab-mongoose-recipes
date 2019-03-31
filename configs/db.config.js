const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://localhost:27017/lab-mongoose-recipes";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() =>
    console.info(`Successfully connected to the database: ${MONGODB_URI}`)
  )
  .catch(() =>
    console.error(
      `An error ocurred trying to connect to the database: ${MONGODB_URI}`
    )
  );
