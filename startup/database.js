const mongoose = require("mongoose");

/**
 * Connect to MongoDB
 * @returns {Promise<boolean>} if the connection was successful
 * @author Justin Gray (A00426753)
 */
module.exports.connect = function () {
  return mongoose
    .connect("mongodb://group2:grain%40store%4002@127.0.0.1:27017/group2", {
      // .connect("mongodb://localhost:27017/softeng", { // can be used instead for a local mongo instance
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      return true;
    })
    .catch((err) => {
      console.error("Couldn't connect to MongoDB: " + JSON.stringify(err));
      return false;
    });
};

/**
 * Disconnect from MongoDB
 * @returns {Promise<boolean>} if the disconnection was successful
 * @author Justin Gray (A00426753)
 */
module.exports.disconnect = function () {
  return mongoose
    .disconnect()
    .then(() => {
      console.log("Disconnected from MongoDB");
      return true;
    })
    .catch((err) => {
      console.error("Couldn't disconnect from MongoDB: " + JSON.stringify(err));
      return false;
    });
};
