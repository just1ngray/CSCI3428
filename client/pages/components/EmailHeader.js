/** EmailHeaeder.js
 * Displays name and subject of email.
 * OnClick will redirect to ViewEmail with emailID
 * @author Nicholas Morash (A00378981) - initial implementation
 * @author Justin Gray (A00426753) - styling, flags, and deleting
 * @author Jay Patel (A00433907) - Responsiveness
 */

import React from "react";
import { useRouter } from "next/router";
import * as Formatter from "../../utils/formatter";
import defaults from "../../utils/defaults";
import axios from "axios";

export default function EmailHeader({ isViewerSender, email, remove, flag }) {
  const router = useRouter();

  let author = "";
  if (isViewerSender) author = Formatter.contacts(email.to);
  else author = Formatter.contact(email.from);

  function handleClickEmail() {
    router.push(`/ViewEmail`);
    localStorage.setItem("emailData", JSON.stringify(email));
  }

  /**
   * Delete the email from the backend then remove it from local state
   * @author Justin Gray (A00426753)
   */
  function handleDelete() {
    if (!window.confirm(`Do you really want to delete this email?`)) return;

    const jwt = localStorage.getItem("token");
    axios
      .delete(
        `${defaults.serverUrl}/email/${isViewerSender ? "sent" : "inbox"}/${
          email._id
        }`,
        {
          headers: {
            "x-auth-token": jwt,
          },
        }
      )
      .then(() => remove())
      .catch((err) => {
        alert("Could not delete the email: " + err);
      });
  }

  /**
   * Flag the email from the backend then update the local state
   * @author Justin Gray (A00426753)
   */
  function handleFlag() {
    const jwt = localStorage.getItem("token");
    const payload = {
      email_id: email._id,
      modifications: {
        add: [],
        remove: [],
      },
    };
    if (email.flags.includes("important"))
      payload.modifications.remove.push("important");
    else payload.modifications.add.push("important");

    axios
      .put(`${defaults.serverUrl}/email/flag`, payload, {
        headers: {
          "x-auth-token": jwt,
        },
      })
      .then((res) => {
        flag(res.data);
      })
      .catch((err) => {
        alert("Could not flag the email: " + err);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1px"
      }}
    >
      <button
        className="button is-light"
        style={{
          width: "100%",
          height: "100%",
          textAlign: "left",
          flex: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        onClick={handleClickEmail}
      >
        <div
          className=""
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {author}
        </div>
        <div
          className=""
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {email.subject}
        </div>
      </button>

      <div className="field is-grouped" style={{ alignSelf: "center" }}>
        <button
          type="button"
          className={`button is-warning ${
            !email.flags.includes("important") ? "is-light" : ""
          }`}
          style={{
            width: "40px",
            border: "1px solid #bfbfbf",
            display: "flex",
          }}
          onClick={handleFlag}
        >
          <i className="fas fa-flag"></i>
        </button>
        <button
          type="button"
          className="button is-danger"
          onClick={handleDelete}
          style={{ width: "40px" }}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
