/**
 * CreateAccount page. Interactive way to create a specialist account
 * on the server.
 * @author Justin Gray (A00426753) - everything but the "Attention Students"
 *                                   which was done by Tiffany
 */
import React, { useState } from "react";
import axios from "axios";
import CustomButton from "./components/CustomButton";
import { useRouter } from "next/router";
import defaults from "../utils/defaults";
import QuestionManager from "./components/QuestionManager";

export default function CreateAccount() {
  const router = useRouter();

  // null indicates it has not been modified
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [email, setEmail] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [isSending, setIsSending] = useState(false);
  const [msgJSX, setMsgJSX] = useState(null);

  /**
   * Set the password field appropriately. If passwordConfirm is
   * null, set to empty string.
   * @param {String} newPW the new password
   * @author Justin Gray (A00426753)
   */
  function setPW(newPW) {
    setPassword(newPW);
    if (passwordConfirm === null) setPasswordConfirm("");
  }

  /**
   * Sends a POST request to the server with the appropriate
   * state variables.
   * @author Justin Gray (A00426753)
   */
  function sendPost() {
    setIsSending(true);
    axios
      .post(`${defaults.serverUrl}/specialist/sign-up`, {
        name,
        password,
        email,
        security: questions,
      })
      .then(() => {
        setMsgJSX(
          <h2 className="has-text-info-dark">
            Sign-Up complete! Redirecting...
          </h2>
        );
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((err) => {
        let msg = "Could not sign-up, please report to an administrator.";
        if (err.response.data.includes("mail"))
          msg = "That email is already registered, please try another.";

        setIsSending(false);
        setMsgJSX(<h2 className="has-text-danger-dark">{msg}</h2>);
      });
  }

  const isValidName = (name || "").length > 0;
  const isValidEmail = /.+@.+\..+/.test(email);
  const isValidPW = (password || "").length > 1;
  const isConfirmPW = isValidPW && password === passwordConfirm;

  let isValidQuestions = questions.length >= 2;
  questions.forEach((q) => {
    isValidQuestions =
      isValidQuestions && q.answer.length > 0 && q.question.length > 0;
  });

  return (
    <form onSubmit={(e) => e.preventDefault()} className="container">
      {msgJSX ? (
        <div>
          {msgJSX}
          <hr />
        </div>
      ) : null}
      <div className="columns is-centered">
        <article className="message is-info">
          <div className="message-header">
            <p>Attention Students!</p>
          </div>
          <div className="message-body">
            Please contact a specialist if you do not currently have an account!
          </div>
        </article>
      </div>
      <br></br>
      <InputBox
        label="Name"
        type="text"
        val={name || ""}
        setVal={setName}
        isValid={name == null || isValidName}
      />
      <InputBox
        label="Email"
        type="email"
        val={email || ""}
        setVal={setEmail}
        isValid={email == null || isValidEmail}
      />
      <InputBox
        label="Password"
        type="password"
        val={password || ""}
        setVal={setPW}
        isValid={password == null || isValidPW}
      />
      <InputBox
        label="Confirm Password"
        type="password"
        val={passwordConfirm || ""}
        setVal={setPasswordConfirm}
        isValid={passwordConfirm == null || isConfirmPW}
      />

      <QuestionManager
        prefix="Security Question"
        questions={questions}
        setQuestions={setQuestions}
      />

      <hr />

      <div className="columns is-centered">
        <HelpMsg
          isConfirmPW={isConfirmPW}
          isValidEmail={isValidEmail}
          isValidName={isValidName}
          isValidPW={isValidPW}
          isValidQuestions={isValidQuestions}
        />
      </div>
      <div className="columns is-centered">
        <CustomButton
          type="submit"
          onClick={sendPost}
          label="Sign-Up"
          disabled={
            !isValidName ||
            !isValidEmail ||
            !isValidPW ||
            !isConfirmPW ||
            !isValidQuestions ||
            isSending
          }
        />
      </div>
    </form>
  );
}

function InputBox({ label, val, setVal, type, isValid }) {
  return (
    <div className="columns field">
      <label className="column is-one-fifth">{label}</label>
      <input
        className={`column is-four-fifths input ${isValid ? "" : "is-danger"}`}
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  );
}

function HelpMsg({
  isValidEmail,
  isValidPW,
  isValidName,
  isConfirmPW,
  isValidQuestions,
}) {
  if (!isValidName) return <p>Please enter a name</p>;
  if (!isValidEmail) return <p>Please enter a valid email address</p>;
  if (!isValidPW) return <p>Please enter a password</p>;
  if (!isConfirmPW) return <p>Please confirm your password</p>;
  if (!isValidQuestions)
    return <p>Please enter at least two security questions</p>;

  return <p>&nbsp;</p>;
}
