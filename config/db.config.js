const mongoose = require('mongoose');
mongoose
    .connect(process.env.MONGODB_URI, {
       useCreateIndex: true,
       useNewUrlParser: true,
       useUnifiedTopology: true
   })
   .then(self => {
       console.log(`Connected to the database: "${self.connection.name}"`);
       // Before adding any documents to the database, let's delete all previous entries
       //return self.connection.dropDatabase();
   })
   .then(() => {
       // Run your code here, after you have insured that the connection was made
   })
   .catch(error => {
       console.error('Error connecting to the database', error);
   });

   process.on("SIGINT", () => {
    mongoose.connection
        .close()
        .then(() => console.log("Successfully disconnected from the DB"))
        .catch((e) => console.log("Error disconnected from the DB", e))
        .finally(() => process.exit())
   })