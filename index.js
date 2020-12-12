/**
 * Set up Express server to handle calls to our database.
 * @author Justin Gray (A00426753) - everything
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
// serve the Page.html files manually
app.use((req, res, next) => {
  // if req.url is of the form /PageName
  if (/^\/[^\/\.]+$/.test(req.url)) {
    res.sendFile(`${__dirname}/client/out${req.url}.html`, () => {
      res.sendFile(`${__dirname}/client/out/404.html`);
    });
  } else next();
});
// serve the static page content automatically
app.use(express.static("client/out"));

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
