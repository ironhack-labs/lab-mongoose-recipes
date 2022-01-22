const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/irondata', {
    useNewUrlParser: true,
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

  process.on("SIGINT", function (){
    mongoose.connection.close(function (){

      console.log("Mongoose disconnected")
      process.exit(0);
    })
  })