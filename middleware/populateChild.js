const Student = require("../models/Student");
const Specialist = require("../models/Specialist");
const mongoose = require("mongoose");
const { request, response } = require("express");
const auth = require("./auth");

/**
 * Populates the "req.auth" object with a property "student" or
 * "specialist" (according to the document found by the _id in
 * req.auth.account.child_id).
 * If the request isn't already authorized (auth middleware),
 * then it must be authorized by this wrapper function.
 * Once authorization has finished, this wrapper function will
 * call this module's inner method populate().
 *
 * @param {request} req     the incoming http request
 * @param {response} res    the outgoing http request
 * @param {function} next   the next middleware function to execute
 * @author Justin Gray (A00426753)
 */
module.exports = function (req, res, next) {
  // if auth hasn't been run, run it (safety procaution)
  if (req.auth === undefined) {
    auth(req, res, () => populate(req, res, next));
  } else {
    populate(req, res, next);
  }
};

/**
 * The populate function that does the heavy lifting. But is
 * for the module's internal use only.
 * @param {request} req     the incoming http request
 * @param {response} res    the outgoing http request
 * @param {function} next   the next middleware function to execute
 * @author Justin Gray (A00426753)
 */
async function populate(req, res, next) {
  const child_id = req.auth.account.child_id;
  if (!mongoose.Types.ObjectId.isValid(child_id))
    return res
      .status(500)
      .send(`That account has an invalid child_id ${child_id}`);

  const student = await Student.findById(child_id);
  if (student) {
    req.auth.student = student;
    next();
  } else {
    const specialist = await Specialist.findById(child_id);
    if (!specialist)
      return res
        .status(500)
        .send(`No student or specialist with _id ${child_id}`);

    req.auth.specialist = specialist;
    next();
  }
}
