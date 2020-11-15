/** EmailHeaeder.js
 * Displays name and subject of email.
 * OnClick will redirect to ViewEmail with emailID
 * @author Nicholas Morash (A00378981)
 * @author Jay Patel (A00433907)
 * @author Justin Gray
 */
import React from "react";
import { useRouter } from "next/router";
import * as Formatter from "../../utils/formatter";
import axios from "axios";
import defaults from "../../utils/defaults";

// userAuthor: true if user is the author of the email (sender)
export default function EmailHeader({ userAuthor, email }) {
  const router = useRouter();

  let author = "";
  if (userAuthor && email) author = Formatter.contacts(email.to);
  if (email) author = Formatter.contact(email.from);

  function formatSubject() {
    const sub = email ? email.subject : "";
    if (sub.length >= 20) {
      return sub.substring(0, 20) + "...";
    }
    return sub;
  }

  function handleClick() {
    router.push(`/ViewEmail`); //todo dynamic route
    localStorage.setItem("emailData", JSON.stringify(email));
  }

  // delete an email from the proper box
  function handleDelete() {
    const jwt = localStorage.getItem("token");
    axios
      .delete(
        `${defaults.serverUrl}/email/${userAuthor ? "sent" : "inbox"}/${
          email._id
        }`,
        {
          headers: {
            "x-auth-token": jwt,
          },
        }
      )
      .then((res) => {
        // locally delete the email, since it no longer exists on the server
        window.location.reload();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="columns">
      {/*clickable email header */}
      <button
        onClick={handleClick}
        type="button"
        className="button 
                           is-light
                           column
                           is-11
                           has-text-left"
      >
        <div className="">
          {author}
          {formatSubject()}
        </div>
      </button>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        type="button"
        className="button 
                            is-danger 
                            is-outlined 
                            is-pulled-right
                            column"
      >
        X
      </button>
    </div>
  );
}
