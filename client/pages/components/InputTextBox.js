/**
 * This file contains a component that generates input text box with different properties
 * And it checks if email is valid; input is non-empty, if it's empty - it will display red box
 *
 * Bivash Pandey (A00425523)
 */
import React, { useState, useEffect } from "react";
import Tippy from "@tippy.js/react";
import store from "../../store";

/**
 * This function returns the input text box
 * @param {*} label the label
 * @param {Number} rows the number of rows
 * @param {String} placeholder the placeholder to be displayed in InputTextBox
 * @param {*} text initial text in the textbox
 * @param {boolean} isCC true if input text box is for CC otherwise false
 */
export default function InputTextBox({ label, rows, placeholder, text, isCC }) {
  // variable state for initial state and setState is to set the state
  const [state, setState] = useState(text);

  // This variable keep tracks if there is any input in the box or not
  const isValidText = (state || "").length > 0;
  // This variable checks if the email is invalid in CC
  const isValidEmail = /.+@.+\..+/.test(state);
  /**
   * This function handles the event when some values are changed
   *
   * @param {*} e the event triggered when values are changed
   */
  async function handleChange(e) {
    const change = e.target.value;
    await setState(change);
    store.dispatch({
      type: `set${label}`,
      payload: change,
    });
  }

  /**
   * This function retuns the help string
   * @param {String} helpType word to be passed in switch statement
   */
  function handleHelp(helpType) {
    switch (helpType) {
      case "To":
        return "Enter the recipient email address here.";
      case "CC":
        return "Enter an additional recipient here.";
      case "Subject":
        return "Enter a concise subject for your email.";
      case "Body":
        return "Compose your message here.";
      case "Greeting":
        return "Part of the message, this is how you greet your recipient.";
      case "Message":
        return "This is the main section of your email.";
      case "Closing":
        return "Part of the message, this is where you say goodbye to your recipient.";
      default:
        return "";
    }
  }
  return (
    <div>
      <Tippy content={handleHelp(label)}>
        <label>
          <strong>{label}</strong>
        </label>
      </Tippy>
      {isCC == true ? (
        <div className="field">
          <input
            className={`input is-medium ${
              state == null || isValidEmail ? "" : "is-danger"
            }`}
            onChange={handleChange}
            value={state}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <div className="field">
          <textarea
            className={`textarea is-info ${
              state == null || isValidText ? "" : "is-danger"
            }`}
            readOnly={false}
            rows={rows}
            cols={80}
            onChange={handleChange}
            value={state}
            placeholder={placeholder}
          />
        </div>
      )}
    </div>
  );
}
