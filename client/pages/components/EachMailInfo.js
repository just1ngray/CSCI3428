/**
 * This file displays a single email element in the list of emails
 *
 * @author: Bivash Pandey (A00425523)
 */
import React from "react";

/**
 * @param {*} to the recipient to whom the email is sent
 * @param {*} subject the subject of the email written by the sender
 */
export default function EachEmailInfo({ to, subject }) {
  /**
   * This function needs to be made functional on clicking delete button
   * @param {*} e the event triggered when button is clicked
   */
  function handleClick(e) {
    console.log("Deleted");
  }

  return (
    <div>
      <span>
        <input type="text" value={to} readOnly />
        <input type="text" value={subject} readOnly />
        <input type="checkbox" />
        <button onClick={handleClick}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </span>
    </div>
  );
}
