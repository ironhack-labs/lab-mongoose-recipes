const mongoose = require('mongoose');

// Connection to the database "recipe-app"
mongoose.connect('mongodb://localhost:27017/recipe-app', {
    useNewUrlParser: true,
})
.then(x => { console.log(`Connected to the database: "${x.connection.name}"`)})
.catch(error => { console.error('Error connecting to the database', error)})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
});


  
