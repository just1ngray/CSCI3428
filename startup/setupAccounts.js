const Account = require("../models/Account");
const Student = require("../models/Student");
const Specialist = require("../models/Specialist");
const mongoose = require("mongoose");

const PASSWORD = "password";

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
  let testerAcc = await Account.findOne({
    email: "tester@autismns.ca",
  });

  // create the tester if it DNE
  if (!testerAcc) {
    createTester();
  }

  // if both exist then we are good
  if (specialistAcc && studentAcc) return;

  const newSpecialistID = mongoose.Types.ObjectId();
  const newStudentID = mongoose.Types.ObjectId();
  const newSpecialistAccID = mongoose.Types.ObjectId();
  const newStudentAccID = mongoose.Types.ObjectId();

  // either 1 or both DNE = 3 cases
  if (!specialistAcc && !studentAcc) {
    createSpecialist(newSpecialistAccID, newSpecialistID, newStudentID);
    createStudent(newStudentAccID, newStudentID, newSpecialistID);
  } else if (!specialistAcc && studentAcc) {
    const stud = await Student.findOne({ _id: studentAcc.child_id });
    createSpecialist(newSpecialistAccID, newSpecialistID, stud._id);
  } else if (specialistAcc && !studentAcc) {
    const spec = await Specialist.findOne({ _id: specialistAcc.child_id });
    createStudent(newStudentAccID, newStudentID, spec._id);
  }
};

/**
 * Create a specialist account that that links to the managed student id
 * @param acc_id          the _id for the account document
 * @param child_id        the _id for the specialist document
 * @param managedStud_id  the id of the managed student
 * @author Justin Gray (A00426753)
 */
async function createSpecialist(acc_id, child_id, managedStud_id) {
  const acc = new Account({
    _id: acc_id,
    name: "Specialist",
    email: "specialist@autismns.ca",
    password: PASSWORD,
    security: [
      {
        question: "The answer is 'abc'",
        answer: "abc",
      },
    ],
    inbox: [],
    sent: [],
    contacts: [],
    child_id: String(child_id),
    childType: "specialist",
  });

  const specialist = new Specialist({
    _id: child_id,
    account: acc._id,
    manages: [managedStud_id],
  });

  await acc.save();
  await specialist.save();
  printCreatedDocuments([acc, specialist]);
  return [acc, specialist];
}

/**
 * Create a student account that that links to the specialist manager id
 * @param acc_id          the _id for the account document
 * @param child_id        the _id for the student document
 * @param managerSpec_id  the id of the specialist manager
 * @author Justin Gray (A00426753)
 */
async function createStudent(acc_id, child_id, managerSpec_id) {
  const acc = new Account({
    _id: acc_id,
    name: "Student",
    email: "student@autismns.ca",
    password: PASSWORD,
    security: [
      {
        question: "The answer is 'abc'",
        answer: "abc",
      },
    ],
    inbox: [],
    sent: [],
    contacts: [],
    child_id: String(child_id),
    childType: "student",
  });

  const student = new Student({
    _id: child_id,
    account: acc._id,
    specialist: managerSpec_id,
    settings: [],
  });

  await acc.save();
  await student.save();
  printCreatedDocuments([acc, student]);
  return [acc, student];
}

/**
 * Create a tester account
 * @author Justin Gray (A00426753)
 */
async function createTester() {
  const acc_id = mongoose.Types.ObjectId();
  const spec_id = mongoose.Types.ObjectId();

  const acc = new Account({
    _id: acc_id,
    name: "Tester",
    email: "tester@autismns.ca",
    password: PASSWORD,
    security: [
      {
        question: `Don't change the password from '${PASSWORD}'`,
        answer: "random unguessable string 123",
      },
    ],
    inbox: [],
    sent: [],
    contacts: [],
    child_id: String(spec_id),
    childType: "specialist",
  });

  const testerSpec = new Specialist({
    _id: spec_id,
    account: acc._id,
    manages: [],
  });

  await acc.save();
  await testerSpec.save();
  printCreatedDocuments([acc, testerSpec]);
  return [acc, testerSpec];
}

/**
 * Prints a formatted line detailing which account has been created
 * @author Justin Gray (A00426753)
 */
function printCreatedDocuments([account, child]) {
  console.log(
    `Created ${account.childType} and account documents. For ${account.email} with the password "${PASSWORD}"`
  );
}
