/**
 * This file displays a list of EmailHeader components in Sent Items and Inbox
 *
 * @author Nicholas Morash (A00378981)
 * @author Bivash ...
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import EmailHeader from "./EmailHeader";
import defaults from "../../utils/defaults";

/**
 * This component retrieves and renders a list of emails.
 * @props isSentPage    boolean, true if emails are sent mails
 */
export default function EmailList({ isSentPage }) {
  const [emails, setEmails] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  // get all the emails
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${defaults.serverUrl}/email/${isSentPage ? "sent" : "inbox"}`, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        const data = res.data.map((eml) => {
          return { ...eml, isViewing: true };
        });
        setEmails(data);
      })
      .catch((err) => {
        console.error(err);
        setEmails(null);
      });
  }, []);

  // automatically runs when the searchVal is changed (and maybe first render?)
  useEffect(() => {
    const copy = emails; // todo: implement deep clone

    if (searchVal.length === 0) {
      // show all
      return;
    }

    // based on searchVal, change emails[x].isViewing property
  }, [searchVal]);

  // OR you may choose to have a button call processSearch
  function processSearch() {}

  let content;
  if (!emails) content = <strong>Error: Could not retrieve emails</strong>;
  else if (emails.length == 0)
    content = <strong>You have no emails in your mailbox!</strong>;
  else {
    content = [];
    emails
      .filter((email) => email.isViewing === true)
      .forEach((email) => {
        content.push(
          <EmailHeader
            key={email._id}
            email={email}
            isViewerSender={isSentPage}
          />
        );
      });
  }

  return (
    <div>
      <input
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder="Search todo"
      />

      <h4 className="card-title">
        <span>
          <u>{isSentPage ? "To" : "From"}</u>
        </span>
        <span className="float-right">
          <u>SUBJECT</u>
        </span>
      </h4>

      <div className="box">
        <p>{content}</p>
      </div>
    </div>
  );
}
