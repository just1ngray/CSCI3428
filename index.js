/**
 * Set up Express server to handle calls to our database.
 * @author Justin Gray (A00426753)
 */
const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.G2_PORT || 3385;

// express middleware function(s)
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log("Starting...");

// serve the pre-built & exported next files
////////////////////////////////////////////////////////////////////////////////////////////////////
// logger: remove after we figure out the refresh issue
app.use((req, res, next) => {
  console.log("Request for:\t" + req.url);
  next();
});
app.use(/^[^\/]*\/[^\/]*\/?$/, express.static("client/out")); // page i.e. "/SentItems"
app.use(express.static("client/out")); // page content "/_next/static/css/062d669da3164933341d.css"
////////////////////////////////////////////////////////////////////////////////////////////////////

// startup functions
require("./startup/routes")(app); // setup '/api' routes
require("./startup/database")
  .connect() // connect to MongoDB
  .then((didConnect) => {
    if (didConnect) {
      require("./startup/setupAccounts")();

      app.listen(port, (err) => {
        if (err) throw err;
        console.log(`Server listening on port ${port}`);
      });
    } else {
      console.log("Closing the application, please install & run MongoDB");
      process.exit(1);
    }
  });
