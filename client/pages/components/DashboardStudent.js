/**
 * An action row to browse and delete a managed student
 * @author Justin Gray (A00426753) - the whole file
 */
import React from "react";

export default function DashboardStudent({ student, remove }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid black",
        borderTop: "1px solid black",
        padding: "10px",
        backgroundColor: "#d9d9d9",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <div className="column is-5">{student.account.name}</div>
        <div className="column is-7">{student.account.email}</div>
      </div>
      <div>
        <button
          type="button"
          className="button is-danger"
          onClick={() => {
            if (
              window.confirm(
                `Do you really want to delete the student account ${student.account.name}?`
              )
            ) {
              remove();
            }
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}
