/**
 * This files contains the component which splits the body of the email in
 * three parts
 *
 * @author Nicholas Morash (A00378981)
 */
import React from "react";
import InputTextBox from "./InputTextBox";

/**
 * This function splits the body in three textboxes
 */
export default function BodySplitter() {
  const closing = "Kind Regards\n\t-(Your Name)";
  return (
    <div>
      {/* first part */}
      <InputTextBox
        label="Greeting"
        rows="1"
        placeholder="Hello (Recipients Name), "
      />
      {/* second part */}
      <InputTextBox
        label="Message"
        rows="10"
        placeholder="This is where your message goes!"
      />
      {/* third part */}
      <InputTextBox label="Closing" rows="2" placeholder={closing} />
    </div>
  );
}
