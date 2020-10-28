/**
 * This file contains a component that generates input text box with different properties
 *
 * @author:
 */

import Tippy from "@tippy.js/react";

/**
 * This function returns a text box
 * @param {*} label the label
 * @param {Number} rows the number of rows
 * @param {*} text initial text in the textbox
 */
function TextBox({ label, rows, text }) {
  /**
   * This function displays a dialog box when hovering over labels
   *
   * @param {String} helpType word to be passed in switch statement
   */
  function handleHelp(helpType) {
    switch (helpType) {
      case "From":
        return "This person sent you the message.";
      case "To":
        return "This is the person you are Replying to.";
      case "Subject":
        return "The (concise) subject matter of the email.";
      case "CC":
        return "Other people this message was sent to.";
      case "Body":
        return "The message that you recieved.";
    }
  }

  return (
    <div className="field">
      <Tippy content={handleHelp(label)}>
        <label><strong>{label}</strong></label>
      </Tippy>
      <textarea
        className="textarea is-info"
        readOnly={true}
        rows={rows}
        cols={80}
        value={text}
      />
    </div>
  );
}

export default TextBox;
