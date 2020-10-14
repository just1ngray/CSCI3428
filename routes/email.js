const router = require("express").Router();
const Email = require("../models/Email");

router.get("/:email_id", async (req, res) => {
  const email = await Email.findById(req.params.email_id);
  // if (email === null)
  //   return res
  //     .status(404)
  //     .send(`Email with _id=${req.params.email_id} not found`);

  // res.send(email);
  res.send({
    _id: "AIJKSBDakjsdbnJKBKNL",
    __v: 1,
    date: Date.now(),
    subject: "Test Subject",
    body: "Hello,\nThis is the body of the email.\nThanks",
    from: {
      name: "Justin",
      email: "justin@gray.ca",
      _id: "account_id",
    },
    to: [
      {
        name: "Nicholas",
        email: "nick@morash.com",
        _id: "account_id2",
      },
    ],
    cc: [],
    bcc: [],
  });
});

router.post("/", async (req, res) => {});

module.exports = router;
