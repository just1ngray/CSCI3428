/**
 * This file initializes a button along with it's properties
 *
 * @author Bivash Pandey (A00425523)
 */

import React from "react";

/**
 * This function defines a custom button
 *
 * @param {*} type the type of the button
 * @param {*} onClick sets the onClick function
 * @param {*} label sets the text to display as button
 * @param {*} disabled defines if the button is clickable
 */
export default function CustomButton({ type, onClick, label, disabled }) {
  return (
    <button
      className="button is-primary is-medium is-rounded"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
