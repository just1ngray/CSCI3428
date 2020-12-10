/**
 * Creates and populates the table with user Name and Email
 *
 * @author Bivash Pandey (A00425523)
 * @author Justin Gray - Converted to Stateless component
 */
import React from "react";

export default function ContactRow({ contact, remove }) {
  // return table row
  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td style={{ padding: 0, display: "flex", justifyContent: "center" }}>
        <button className="button is-danger" onClick={remove}>
          X
        </button>
      </td>
    </tr>
  );
}
