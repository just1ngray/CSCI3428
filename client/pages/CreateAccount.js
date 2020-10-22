import React, { useState } from "react";
import axios from "axios";
import CustomButton from "./components/CustomButton";
import { useRouter } from "next/router";

const serverURL = "http://ugdev.cs.smu.ca:3385/api/specialist/sign-up";

export default function CreateAccount() {
  const router = useRouter();

  // null indicates it has not been modified
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [email, setEmail] = useState(null);

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
      .post(serverURL, {
        name,
        password,
        email,
      })
      .then(() => {
        setMsgJSX(
          <h2 className="has-text-info-dark">
            Sign-Up complete! Redirecting...
          </h2>
        );
        setTimeout(() => {
          router.push("/Login");
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

  return (
    <form onSubmit={(e) => e.preventDefault()} className="container">
      {msgJSX ? (
        <div>
          {msgJSX}
          <hr />
        </div>
      ) : null}

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

      <div className="columns is-centered">
        <HelpMsg
          isConfirmPW={isConfirmPW}
          isValidEmail={isValidEmail}
          isValidName={isValidName}
          isValidPW={isValidPW}
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

function HelpMsg({ isValidEmail, isValidPW, isValidName, isConfirmPW }) {
  if (!isValidName) return <p>Please enter a name</p>;
  if (!isValidEmail) return <p>Please enter a valid email address</p>;
  if (!isValidPW) return <p>Please enter a password</p>;
  if (!isConfirmPW) return <p>Please confirm your password</p>;

  return <p>&nbsp;</p>;
}
