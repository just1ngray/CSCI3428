const router = require("express").Router();
const Email = require("../models/Email");
const Account = require("../models/Account");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

/**
 * Change the flags of an email
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#put-apiemailflag-a
 * @author Justin Gray (A00426753)
 */
router.put("/flag", auth, (req, res) => {
  const account = req.auth.account;
  const email_id = req.body.email_id;
  const modifications = req.body.modifications;

  if (typeof email_id !== "string")
    return res.status(400).send("Invalid email_id in body");
  if (
    typeof modifications !== "object" ||
    typeof modifications.add !== "object" ||
    typeof modifications.remove !== "object"
  )
    return res.status(400).send("Invalid flag modifications");

  let newFlags = null;
  for (const box of ["inbox", "sent"]) {
    const email = account[box].filter((e) => e.email == email_id)[0];
    if (!email) continue;

    const flags = email.flags.filter((f) => !modifications.remove.includes(f));
    modifications.add
      .filter((f) => !flags.includes(f))
      .forEach((f) => flags.push(f));
    email.flags = [...flags];
    newFlags = email.flags;

    account.markModified(box);

    // if an email is sent to themselves, then the email's flags should be modified
    // in both the inbox and sent box. Thus we cannot break
    //break;
  }

  if (newFlags === null) return res.status(404).send("Email not found");

  account
    .save()
    .then(() => res.send(newFlags))
    .catch((err) => res.status(400).send(err));
});

/**
 * Send an email to anyone in the system
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#post-apiemail-a
 * @author Justin Gray (A00426753)
 */
router.post("/", auth, async (req, res) => {
  const sender = req.auth.account;

  const from = fillContact({
    ...req.body.from,
    account: sender._id,
  });

  const to = [];
  if (req.body.to)
    req.body.to.forEach((contact) => to.push(fillContact(contact)));

  const cc = [];
  if (req.body.cc)
    req.body.cc.forEach((contact) => cc.push(fillContact(contact)));

  const bcc = [];
  if (req.body.bcc)
    req.body.bcc.forEach((contact) => bcc.push(fillContact(contact)));

  Promise.all([from, ...to, ...cc, ...bcc])
    .then((resolved) => {
      const email = new Email({
        date: Date.now(),
        subject: req.body.subject,
        body: req.body.body,
        from: resolved[0],
        to: resolved.slice(1, 1 + to.length),
        cc: resolved.slice(1 + to.length, 1 + to.length + cc.length),
        bcc: resolved.slice(1 + to.length + cc.length, resolved.length),
      });
      email
        .save()
        .then(() => {
          res.send(email);

          // add to sender sent
          sender.sent.push({
            flags: [],
            email: email._id,
          });
          const senderContactKeys = sender.contacts.map(
            (c) => `${c.name};${c.email}`
          );
          resolved
            .slice(1, resolved.length)
            .filter((c) => !senderContactKeys.includes(`${c.name};${c.email}`))
            .forEach((c) => {
              senderContactKeys.push(`${c.name};${c.email}`);
              sender.contacts.push(c);
              sender.markModified("contacts");
            });
          sender.markModified("sent");
          sender.save();

          // add to recipient inbox
          resolved
            .slice(1, resolved.length)
            .map((contact) => contact.account)
            .filter((_id) => _id !== undefined)
            .forEach(async (_id) => {
              const recipient = await Account.findById(_id);
              recipient.inbox.push({
                flags: [],
                email: email._id,
              });
              recipient.markModified("inbox");
              recipient.save();
            });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/**
 * Gets all emails in the account's inbox
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#get-apiemailinbox-a
 * @author Justin Gray (A00426753)
 */
router.get("/inbox", auth, async (req, res) => {
  const email_ids = [];
  const account = req.auth.account;

  account.inbox.forEach((wrapper) => email_ids.push(wrapper.email));
  const { inbox } = await getEmails(account, email_ids);

  res.send(inbox);
});

/**
 * Gets all emails in the account's sent
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#get-apiemailsent-a
 * @author Justin Gray (A00426753)
 */
router.get("/sent", auth, async (req, res) => {
  const email_ids = [];
  const account = req.auth.account;

  account.sent.forEach((wrapper) => email_ids.push(wrapper.email));
  const { sent } = await getEmails(account, email_ids);

  res.send(sent);
});

/**
 * Gets a single email document
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#get-apiemailemail_id-a
 * @author Justin Gray (A00426753)
 */
router.get("/:email_id", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.email_id))
    return res.status(400).send(`Invalid email_id ${req.params.email_id}`);

  const email = await Email.findById(req.params.email_id);
  if (!email)
    return res
      .status(404)
      .send(`Email with _id=${req.params.email_id} not found`);

  const { inbox, sent } = await getEmails(req.auth.account, [
    req.params.email_id,
  ]);

  if (inbox.length > 0) {
    res.send(inbox[0]);
  } else if (sent.length > 0) {
    res.send(sent[0]);
  } else {
    res.status(403).send("No permission to view.");
  }
});

/**
 * Delete an email from an account's 'inbox' | 'sent' (box).
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#delete-apiemailboxemail_id-a
 * @author Justin Gray (A00426753)
 */
router.delete("/:box/:email_id", auth, async (req, res) => {
  const account = req.auth.account;

  // validate parameters
  if (!["inbox", "sent"].includes(req.params.box))
    return res
      .status(400)
      .send("Incorrect box parameter. Try either 'inbox' or 'sent'.");

  if (!mongoose.Types.ObjectId.isValid(req.params.email_id))
    return res.status(400).send("Email id parameter is invalid.");

  // find the email
  const index = account[req.params.box]
    .map((email) => email.email)
    .indexOf(req.params.email_id);
  if (index == -1)
    return res.status(404).send("Email doesn't exist in your mailbox.");

  const emailInBox = account[req.params.box].splice(index, 1);
  const email = await Email.findById(req.params.email_id);

  // save the account with the email gone
  account.markModified(req.params.box);
  account
    .save()
    .then(() => {
      delete email.bcc;
      // return the email that was just deleted
      res.send({
        ...email,
        flags: emailInBox.flags,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });

  // delete email.X.account to the deleting account
  const delAcc_id = req.auth._id;
  if (email.from && email.from.account == delAcc_id) {
    delete email.from.account;
    email.markModified("from");
  }

  ["to", "cc", "bcc"].forEach((recipientType) => {
    email[recipientType].forEach((contact, index) => {
      if (contact.account && contact.account == delAcc_id) {
        delete email[recipientType][index].account;
        email.markModified(recipientType);
      }
    });
  });

  // and remove the email document if no account refers to it anymore
  let shouldExist = false;
  if (email.from && email.from.account) shouldExist = true;

  ["to", "cc", "bcc"].forEach((recipientType) => {
    email[recipientType].forEach((contact) => {
      if (contact.account && contact.account) shouldExist = true;
    });
  });

  if (!shouldExist) {
    email.remove();
  } else {
    email.save();
  }
});

/**
 * Get a list of specific emails by _id. Delete BCC and add account flags.
 * @param {Account} account     the account to search for emails in
 * @param {String[]} email_ids  the email _ids to search for
 * @returns { Promise<{ inbox: Object[], sent: Object[]; }> }
 * @author Justin Gray (A00426753)
 */
async function getEmails(account, email_ids) {
  // ensure all are strings
  const searchIds = email_ids.map((id) => String(id));

  /**
   * Queries to find the email object, then classifies appropriately.
   * @param {String} email_id           the _id of the email
   * @param {"inbox" | "sent"} type     where the email belongs
   * @param {String[]} flags            account-only flags for the email
   * @returns Promise<{ type: "inbox" | "sent", email: {...}, flags: String[] }>
   */
  function findAndClassify(email_id, type, flags) {
    return new Promise(async (resolve) => {
      try {
        const email = await Email.findById(email_id);
        if (!email) throw Error();

        resolve({ type, email, flags });
      } catch {
        // we could reject, but then we'd have to handle it properly
        resolve("not found");
      }
    });
  }

  // array of promises - generated by findAndClassify function
  const queries = [];
  ["inbox", "sent"].forEach((type) => {
    account[type]
      .filter((wrapper) => searchIds.includes(String(wrapper.email)))
      .forEach((wrapper) =>
        queries.push(findAndClassify(wrapper.email, type, wrapper.flags))
      );
  });

  // when all promises are finished, return the formatted version of the
  // "findAndClassify" promises
  return Promise.all(queries).then((classifiedEmails) => {
    const emails = {
      inbox: [],
      sent: [],
    };

    classifiedEmails
      .filter((e) => typeof e !== "string") // it's string when DNE
      .forEach((e) => {
        const formattedEmail = {
          flags: [...e.flags],
          ...e.email._doc,
        };
        delete formattedEmail.bcc;
        emails[e.type].push(formattedEmail);
      });

    return emails;
  });
}

/**
 * Fills a contact the best it can. Searches for an account,
 * and fills missing information if possible.
 * @param {Object} contact  the contact (name, email, account?) to fill
 * @returns                 the filled contact
 * @author Justin Gray (A00426753)
 */
async function fillContact(contact) {
  const accEmail = await Account.findOne({ email: contact.email });
  if (mongoose.Types.ObjectId.isValid(contact.account)) {
    const accById = await Account.findById(contact.account);
    return {
      name: contact.name === undefined ? accById.name : contact.name,
      email: contact.email === undefined ? accById.email : contact.email,
      account: contact.account,
    };
  } else if (accEmail) {
    return {
      name: contact.name === undefined ? accEmail.name : contact.name,
      email: contact.email === undefined ? accEmail.email : contact.email,
      account: accEmail._id,
    };
  } else {
    return {
      name: contact.name,
      email: contact.email,
    };
  }
}

module.exports = router;
