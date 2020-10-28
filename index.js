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

// startup functions
require("./startup/routes")(app); // setup '/api' routes
require("./startup/database")
  .connect() // connect to MongoDB
  .then((didConnect) => {
    if (didConnect) require("./startup/setupAccounts")();
  });

/**
 * Redirect any non-api requests to the front-end NextJS
 * optimized server.
 * NextJS can be run with:
 *      $ npm run build
 *      $ npm run client
 * And will be started on port 3384.
 * @author Justin Gray (A00426753)
 */
app.get("*", (req, res) => {
  res.redirect(301, `${req.hostname}:3384${req.url}`);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${port}`);
});
