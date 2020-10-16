/**
 * Set up the '/api' route and catch everything that doesn't have a designated router.
 * @author Justin Gray (A00426753)
 */
module.exports = function (app) {
  // route each endpoint to the proper router file
  app.use("/api/email", require("../routes/email"));
  app.use("/api/account", require("../routes/account"));
  app.use("/api/specialist", require("../routes/specialist"));

  // catch-all for /api calls: prevents from serving next content
  app.use("/api", (req, res) => {
    res.status(404).send({
      message:
        "Endpoint not found. See https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints",
      url: req.originalUrl,
      body: req.body,
      protocol: req.protocol,
      headers: req.headers,
    });
  });
};
