const router = require("express").Router();
const Account = require("../models/Account");

router.post("/login", async (req, res) => {
  res.send("logged in");
});

module.exports = router;
