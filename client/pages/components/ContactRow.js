/**
 * Creates and populates the table with user Name and Email
 *
 * @author Bivash Pandey (A00425523)
 * @author Justin Gray - Converted to Stateless component
 */
import React from "react";

export default function ContactRow({ contact, remove, isHeader = false }) {
  if (!contact) return <div></div>; //satisfy Next build process
  const rowItem = {
    display: "inline-block",
    width: "50%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: isHeader ? "bold" : "normal",
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#eee",
        padding: "0.25em",
        display: "flex",
        alignItems: "center",
      }}
      className="auto-test-selector-contactrow"
    >
      <div style={rowItem}>{contact.name}</div>
      <div style={rowItem}>{contact.email}</div>
      {isHeader ? null : (
        <button className="button is-danger" onClick={remove}>
          X
        </button>
      )}
    </div>
  );
}
