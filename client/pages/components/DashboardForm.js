/**
 * Create a new managed student account
 * @author Justin Gray (A00426753) - the whole file
 */
import React, { useState } from "react";
import QuestionManager from "./QuestionManager";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import defaults from "../../utils/defaults";

export default function DasboardForm({ addStudent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [questions, setQuestions] = useState([]);

  /**
   * Submit the form to the backend
   * @param {React.FormEvent<HTMLFormElement>} e the submit event
   */
  function submit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      name: name,
      email: email,
      password: password,
      security: questions,
    };

    axios
      .post(`${defaults.serverUrl}/specialist/student`, payload, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        console.log(res.data);
        addStudent(res.data);

        setName("");
        setPassword("");
        setQuestions([]);
      })
      .catch((err) => {
        if (
          err.response.data &&
          typeof err.response.data == "string" &&
          err.response.data.includes("email")
        ) {
          alert("That email is already taken. Please choose another.");
        }
      })
      .finally(() => {
        setEmail("");
      });
  }

  /**
   * Wraps the setQuestions to format the answer to lowercase only
   */
  function setQuestionsFormat(newQuestions) {
    setQuestions(
      newQuestions.map((qa) => {
        return {
          question: qa.question,
          answer: qa.answer.toLowerCase(),
        };
      })
    );
  }

  let isValid = true;
  if (questions.length < 2) isValid = false;
  if (name.length < 1) isValid = false;
  if (!/.+@.+\..+/.test(email)) isValid = false;
  if (password.length < 1) isValid = false;

  return (
    <form onSubmit={submit}>
      <InputRow label="Name" val={name} setVal={setName} type="text" />
      <InputRow label="Email" val={email} setVal={setEmail} type="email" />
      <InputRow
        label="Password"
        val={password}
        setVal={setPassword}
        // type could be 'password', but that may make the user think this application
        // is secure. It's not. It uses HTTP + I'm sure other reasons
        type="text"
      />

      <QuestionManager
        questions={questions}
        setQuestions={setQuestionsFormat}
        prefix="Security Question"
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>
          You need to fill all fields and provide at least 2 security questions.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <CustomButton
          type="submit"
          onClick={submit}
          label="Create Student"
          disabled={!isValid}
        />
      </div>
    </form>
  );
}

/**
 * An input row
 *      Label [--------------------------]
 * @props label     the label of the input row
 * @props val       the current value of the input box
 * @props setVal    a function to set the value of the input box
 * @props type      the input type
 */
function InputRow({ label = "", val = "", setVal = (v) => {}, type = "" }) {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{label}</label>
      </div>

      <div className="field-body control">
        <input
          className="input"
          type={type}
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
    </div>
  );
}
