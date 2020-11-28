const Account = require("../models/Account");
const Student = require("../models/Student");
const Specialist = require("../models/Specialist");
const mongoose = require("mongoose");

/**
 * Ensures the hardcoded specialist and student accounts exist.
 * If they don't exist, they're created.
 *
 * @author Justin Gray (A00426753)
 */
module.exports = async function verifyAccounts() {
  let specialistAcc = await Account.findOne({
    email: "specialist@autismns.ca",
  });
  let studentAcc = await Account.findOne({
    email: "student@autismns.ca",
  });

  // guard against both accounts existing
  if (specialistAcc !== null && studentAcc !== null) return;
  // otherwise create a new instance

  try {
    console.log("Creating specialist and student accounts:");
    const promises = [];

    const specialistID = mongoose.Types.ObjectId();
    const studentID = mongoose.Types.ObjectId();
    const specialistAccID = mongoose.Types.ObjectId();
    const studentAccID = mongoose.Types.ObjectId();

    specialistAcc = new Account({
      _id: specialistAccID,
      name: "Specialist",
      email: "specialist@autismns.ca",
      password: "password",
      security: [
        {
          question: "The answer is 'abc'",
          answer: "abc",
        },
      ],
      inbox: [],
      sent: [],
      contacts: [],
      child_id: String(specialistID),
      childType: "specialist",
    });
    promises.push(specialistAcc.save());

    studentAcc = new Account({
      _id: studentAccID,
      name: "Student",
      email: "student@autismns.ca",
      password: "password",
      security: [
        {
          question: "The answer is 'abc'",
          answer: "abc",
        },
      ],
      inbox: [],
      sent: [],
      contacts: [],
      child_id: String(studentID),
      childType: "student",
    });
    promises.push(studentAcc.save());

    const specialist = new Specialist({
      _id: specialistID,
      account: specialistAcc._id,
      manages: [studentID],
    });
    promises.push(specialist.save());

    const student = new Student({
      _id: studentID,
      account: studentAcc._id,
      specialist: specialistID,
      settings: [],
    });
    promises.push(student.save());

    Promise.all(promises)
      .then((documents) => {
        for (const doc of documents) {
          console.log(doc);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.error(error);
  }
};
