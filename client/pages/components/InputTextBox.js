/**
 * This file contains a component that generates input text box with different properties
 *
 * Bivash Pandey (A00425523)
 */
import React, { useState } from "react";
import Tippy from "@tippy.js/react";
import store from "../../store";

/**
 * This function returns the input text box
 * @param {*} label the label
 * @param {Number} rows the number of rows
 * @param {String} placeholder the placeholder to be displayed in InputTextBox
 * @param {*} text initial text in the textbox
 */
export default function InputTextBox({ label, rows, placeholder, text }) {
  // variable state for initial state and setState is to set the state
  const [state, setState] = useState(text);

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
    <div className="field">
      <Tippy content={handleHelp(label)}>
        <label>{label}</label>
      </Tippy>
      <textarea
        className="textarea is-info"
        readOnly={false}
        rows={rows}
        cols={80}
        onChange={handleChange}
        value={state}
        placeholder={placeholder}
      />
    </div>
  );
}
