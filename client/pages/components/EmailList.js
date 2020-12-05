/**
 * This file displays a list of EmailHeader components in Sent Items and Inbox
 * Users are now able to filter the emails
 *
 * @author Nicholas Morash (A00378981)
 * @author Bivash Pandey (A00425523) - search bar and its filter functionality
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import EmailHeader from "./EmailHeader";
import defaults from "../../utils/defaults";
import filterEmails from "../../utils/filterEmails";

/**
 * This component retrieves and renders a list of emails.
 * @props isSentPage    boolean, true if emails are sent mails
 */
export default function EmailListOld({ isSentPage }) {
  const [emails, setEmails] = useState([]);
  const [showEmailIndices, setShowEmailIndices] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    setShowEmailIndices(filterEmails(emails, searchVal));
  }, [searchVal]);

  // get all the emails
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${defaults.serverUrl}/email/${isSentPage ? "sent" : "inbox"}`, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        setEmails(res.data);
        setShowEmailIndices([...new Array(res.data.length).keys()]);
      })
      .catch((err) => {
        console.error(err);
        setEmails(null);
      });
  }, []);

  let content;
  if (!emails) content = <strong>Error: Could not retrieve emails</strong>;
  else if (emails.length == 0)
    content = <strong>You have no emails in your mailbox!</strong>;
  else if (showEmailIndices.length == 0)
    content = <strong>No emails match your search</strong>;
  else {
    content = [];
    emails
      .filter((email, index) => showEmailIndices.includes(index))
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
      <p className="control has-icons-left">
        <input
          className="input is-Large"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search mail"
        />
        <span className="icon is-small is-left">
          <i className="fas fa-search"></i>
        </span>
      </p>
      <br />
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
