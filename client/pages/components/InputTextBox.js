/**
 * @author: Bivash Pandey (A00425523)
 */
import React, { useState } from "react";
import Tippy from "@tippy.js/react";
import store from "../../store";

export default function InputTextBox({ label, rows, placeholder, text }) {
  const [state, setState] = useState(text);

  async function handleChange(e) {
    const change = e.target.value;
    await setState(change);
    store.dispatch({
      type: `set${label}`,
      payload: change,
    });
  }

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
