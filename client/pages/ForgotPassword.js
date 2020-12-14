/**
 * Reset a forgotten password of any account using security questions
 * @author Justin Gray (A00426753) - the whole file
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import defaults from "../utils/defaults";
import QuestionManager from "./components/QuestionManager";
import CustomButton from "./components/CustomButton";
import { useRouter } from "next/router";
import PageTitle from "./components/PageTitle";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailRes, setEmailRes] = useState("");
  const [password, setPassword] = useState("");
  const [questions, setQuestions] = useState([]);
  const [accountID, setAccountID] = useState("");

  /**
   * Automatically HTTP request and fill as possible this page's state
   */
  useEffect(() => {
    const stampedEmail = String(email);
    axios
      .get(`${defaults.serverUrl}/account/securityquestions/${email}`)
      .then((res) => {
        setQuestions(
          res.data.questions.map((q) => {
            return {
              question: q,
              answer: "",
            };
          })
        );
        setAccountID(res.data.account_id);
        setEmailRes("");
      })
      .catch(() => {
        if (stampedEmail.length > 0)
          setEmailRes(`No account with email '${stampedEmail}'`);
      });
  }, [email]);

  /**
   * Sent the HTTP request to reset the account's password
   * @param e the submit form event
   */
  function resetPassword(e) {
    e.preventDefault();

    axios
      .put(`${defaults.serverUrl}/account/change-credentials/${accountID}`, {
        security: questions,
        newPW: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data);
        alert("Your password has been changed! Logging you in...");
        router.push("/");
      })
      .catch(() => {
        alert(
          "Could not reset password! You likely had the wrong answers to the security questions"
        );
      });
  }

  function setEmailWrapper(val) {
    if (questions !== []) setQuestions([]);
    setEmail(val);
  }

  return (
    <div>
      <br />
      <div>
        <PageTitle title="RESET PASSWORD" />
      </div>
      <br />
      <div>
        <label>Email of your account:</label>
        <input
          className="control input"
          placeholder="Enter the email attached to your account"
          type="text"
          value={email}
          onChange={(e) => setEmailWrapper(e.target.value)}
        />
        {emailRes.length === 0 ? null : <p>{emailRes}</p>}
      </div>

      {questions.length === 0 ? null : (
        <form>
          <hr />
          <QuestionManager
            questions={questions}
            prefix="Question"
            setQuestions={setQuestions}
            readOnlyQuest={true}
          />

          <div>
            <label>Your new password</label>
            <input
              className="control input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <CustomButton
              type="submit"
              onClick={resetPassword}
              label="Reset Password"
              disabled={password.length === 0}
            />
          </div>
        </form>
      )}
    </div>
  );
}
