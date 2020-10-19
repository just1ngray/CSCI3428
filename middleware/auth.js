const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
const { request, response } = require("express");

/**
 * A middleware function to verify valid authorization in certain
 * requests. If a valid JSONWebToken is provided in the header key
 * "x-auth-token", it will search for the referenced account in the
 * decoded JSONWebToken body._id.
 * If account doesn't exist, return 404.
 * If the account exists, the request object will have an "auth"
 * property which contains:
 *      1) token: the original JSONWebToken provided by the client
 *      2) decoded: the decoded JSONWebToken
 *      3) account: the mongoose account document referred by the
 *                  decoded._id
 * Invalid or missing JSONWebToken will return status 401.
 *
 * @param {request} req     incoming express request
 * @param {response} res    outgoing express response
 * @param {function} next   the next function to execute on success
 * @author Justin Gray (A00426753)
 */
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("No token provided.");

  try {
    const decoded = jwt.verify(token, String(process.env.G2_JWT));
    Account.findById(decoded._id).then((account) => {
      if (!account)
        return res.status(404).send("Authorized, but no account found.");

      req.auth = {
        token,
        decoded,
        account,
      };
      next();
    });
  } catch (decodeError) {
    res.status(401).send("Invalid token.");
  }
};
