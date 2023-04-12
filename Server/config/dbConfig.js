
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const dbconfig = async () => {
    try {
      await mongoose.connect("mongodb+srv://vishnu:vishnurb12345@cluster0.uctx9vq.mongodb.net/ourEvents", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("CONNECTED 👍");
    } catch (error){
      console.log(error,"OH NO MONGO CONNECTION ERROR!!!!");
   
      process.exit();
    }
  };
module.exports = dbconfig;  