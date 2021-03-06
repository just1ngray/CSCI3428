const router = require("express").Router();
const auth = require("../middleware/auth");
const Account = require("../models/Account");

/**
 * Get the security questions for an account
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#get-apiaccountsecurityquestionsemail
 * @author Justin Gray (A00426753)
 */
router.get("/securityquestions/:email", async (req, res) => {
  try {
    const account = await Account.findOne({ email: req.params.email });
    const securityQuestions = account.security.map((qa) => qa.question);
    res.send({
      questions: securityQuestions,
      account_id: String(account._id),
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * Get your contacts
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#get-apiaccountcontacts-a
 * @author Justin Gray (A00426753)
 */
router.get("/contacts", auth, (req, res) => {
  const account = req.auth.account;
  res.send(account.contacts);
});

/**
 * Create a new contact
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#post-apiaccountcontact-a
 * @author Justin Gray (A00426573)
 */
router.post("/contact", auth, async (req, res) => {
  if (!req.body.email || req.body.email.length === 0) {
    res.status(400).send("Cannot create a contact without an email address");
    return;
  }

  const account = req.auth.account;
  try {
    const contactAcc = await Account.findOne({ email: req.body.email });
    let contact = {
      name: req.body.name,
      email: req.body.email,
    };
    if (contactAcc) contact.account = contactAcc._id;

    let index = -1;
    account.contacts.forEach((c, i) => {
      if (c.email.toLowerCase() === contact.email.toLowerCase()) {
        index = i;
        return;
      }
    });
    if (index !== -1) {
      res.status(400).send("That email already exists in your address book");
      return;
    }

    account.contacts.push(contact);
    account.markModified("contacts");
    await account.save();
    res.send(account.contacts[account.contacts.length - 1]);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

/**
 * Delete a contact
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#delete-apiaccountcontactemail-a
 * @author Justin Gray (A00426753)
 */
router.delete("/contact/:email", auth, (req, res) => {
  const account = req.auth.account;

  const index = account.contacts.map((c) => c.email).indexOf(req.params.email);
  if (index == -1)
    return res.status(404).send(`Contact with ${req.params.email} not found`);

  const removed = account.contacts.splice(index, 1);
  account.markModified("contacts");
  account
    .save()
    .then(() => res.send(removed[0]))
    .catch((err) => res.status(400).send(err.message));
});

/**
 * Login and receive a JSONWebToken.
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#post-apiaccountlogin
 * @author Justin Gray (A00426753)
 */
router.post("/login", async (req, res) => {
  const email = String(req.body.username).toLowerCase();
  const password = req.body.password;

  const account = await Account.findOne({ email });

  // In a highly secure application, we should not confirm or
  // deny the existance of accounts by an email address.
  // But for this application it might be helpful to have more
  // detailed error messages.
  if (!account) return res.status(404).send("Account not found.");

  const isValidPassword = await account.isValidPassword(password);
  if (isValidPassword) {
    res.send({
      token: account.getAuthToken(),
      childType: account.childType,
    });
  } else {
    res.status(403).send("Wrong password.");
  }
});

/**
 * Change your account's name, email, or password.
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#put-apiaccountchange-credentialsaccount_id
 * @author Justin Gray (A00426753)
 */
router.put("/change-credentials/:account_id", async (req, res) => {
  const account_id = req.params.account_id;
  const currentPW = req.body.currentPW;
  const securityAns = req.body.security;

  // optionals
  const newEmail = req.body.newEmail;
  const newPW = req.body.newPW;
  const newName = req.body.newName;

  try {
    const account = await Account.findById(account_id);
    if (!account) return res.status(404).send("Account not found.");

    const isAuthed = await isAuth(account, currentPW, securityAns);
    if (!isAuthed) return res.status(403).send("Not authorized.");

    if (newPW !== undefined) account.password = newPW;
    if (newEmail !== undefined) account.email = newEmail;
    if (newName !== undefined) account.name = newName;

    account
      .save()
      .then((acc) => res.send(acc.getAuthToken()))
      .catch((err) => res.status(400).send(`Could not save. ${err.message}`));
  } catch {
    res.status(400).send(`${account_id} is not a valid Mongo ObjectID`);
  }
});

/**
 * Find if a user is authorized for the specified account.
 * @author Justin Gray (A00426753)
 */
async function isAuth(account, plainPW, security) {
  if (plainPW) return await account.isValidPassword(plainPW);

  function formatAnswer(ans) {
    return ans.toLowerCase().replace(" ", "");
  }

  return new Promise((resolve) => {
    account.security.forEach((dbqa) => {
      const qa = security.filter(
        (securityQuestion) => securityQuestion.question === dbqa.question
      )[0];
      if (formatAnswer(qa.answer) !== formatAnswer(dbqa.answer))
        return resolve(false);
    });

    resolve(true);
  });
}

module.exports = router;
