const router = require("express").Router();
const mongoose = require("mongoose");
const Account = require("../models/Account");
const Specialist = require("../models/Specialist");
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const populateChild = require("../middleware/populateChild");

/**
 * Sign up a new specialist environment.
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#post-apispecialistsign-up
 * @author Justin Gray (A00426753)
 */
router.post("/sign-up", (req, res) => {
  const specialist_id = mongoose.Types.ObjectId();
  const account_id = mongoose.Types.ObjectId();

  Account.findOne({ email: String(req.body.email) })
    .then((existingAcc) => {
      if (existingAcc) return res.status(400).send("Email needs to be unique.");

      const account = new Account({
        _id: account_id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        security: req.body.security,
        inbox: [],
        sent: [],
        contacts: [],
        child_id: String(specialist_id),
        childType: "specialist",
      });

      const specialist = new Specialist({
        _id: specialist_id,
        account: account_id,
        manages: [],
      });

      account
        .save()
        .then(() => specialist.save())
        .then(() => res.sendStatus(200))
        .catch(async (err) => {
          const savedAcc = await Account.findById(account_id);
          const savedSpec = await Specialist.findById(specialist_id);

          if (savedAcc) await savedAcc.remove();
          if (savedSpec) await savedSpec.remove();

          res.status(400).send(err);
        });
    })
    .catch((err) => res.status(400).send(err));
});

/**
 * Create a new student account managed by a specialist
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#post-apispecialiststudent-a
 * @author Justin Gray (A00426753)
 */
router.post("/student", [auth, populateChild], (req, res) => {
  const specialist = req.auth.specialist;
  if (specialist === undefined)
    return res.status(403).send("You must be a specialist.");

  const studAcc_id = mongoose.Types.ObjectId();
  const student_id = mongoose.Types.ObjectId();

  const studAcc = new Account({
    _id: studAcc_id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password ? req.body.password : "autismns",
    security: req.body.security,
    inbox: [],
    sent: [],
    contacts: [],
    child_id: student_id,
    childType: "student",
  });

  const student = new Student({
    account: studAcc_id,
    specialist: specialist._id,
    settings: [],
  });

  studAcc
    .save()
    .then(() => student.save())
    .then(() => {
      specialist.manages.push(student_id);
      specialist.markModified("manages");
      specialist.save();
    })
    .then(() =>
      res.send({
        account_id: studAcc._id,
        student_id: student._id,
      })
    )
    .catch(async (err) => {
      const savedAcc = await Account.findById(studAcc_id);
      const savedStud = await Specialist.findById(student_id);

      if (savedAcc) await savedAcc.remove();
      if (savedStud) await savedStud.remove();

      res.status(400).send(err);
    });
});

/**
 * Deletes a student account from the authorized specialist's environment.
 * https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints#delete-apispecialiststudentstudent_id-a
 * @author Justin Gray (A00426753)
 */
router.delete(
  "/student/:student_id",
  [auth, populateChild],
  async (req, res) => {
    const specialist = req.auth.specialist;
    if (specialist === undefined)
      return res.status(403).send("You must be a specialist.");

    const student_id = req.params.student_id;
    if (!mongoose.Types.ObjectId.isValid(student_id))
      return res.status(400).send(`Invalid student_id: ${student_id}`);

    const student = await Student.findById(student_id);
    if (!student) return res.status(404).send("Student not found.");
    const studAcc = await Account.findById(student.account);
    if (!studAcc) return res.status(404).send("Student account not found.");

    if (String(student.specialist) !== String(req.auth.specialist._id))
      return res.status(403).send("No permission to delete that student.");

    specialist.manages = specialist.manages.filter(
      (o_id) => String(o_id) !== student_id
    );
    specialist.save();

    const promises = [];
    promises.push(student.remove());
    promises.push(studAcc.remove());

    Promise.all(promises)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(400).send(err));
  }
);

module.exports = router;
