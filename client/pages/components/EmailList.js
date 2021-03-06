/**
 * This file displays a list of EmailHeader components in Sent Items and Inbox
 * Users are now able to filter the emails
 *
 * @author Nicholas Morash (A00378981)
 * @author Bivash Pandey (A00425523) - search bar and its filter functionality
 * @author Justin Gray (A00426753) - pagination functionality
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import EmailHeader from "./EmailHeader";
import defaults from "../../utils/defaults";
import filterEmails from "../../utils/filterEmails";
import Pagination from "./Pagination";

/**
 * This component retrieves and renders a list of emails.
 * @props isSentPage    boolean, true if emails are sent mails
 */
export default function EmailList({ isSentPage, pageSize }) {
  const [emails, setEmails] = useState([]);
  const [showEmailIndices, setShowEmailIndices] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [pageNum, setPageNum] = useState(1); // 1 indexed

  useEffect(() => {
    setShowEmailIndices(filterEmails(emails, searchVal));
    setPageNum(1);
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

  /**
   * Delete an email from the local state
   * @param email_id the id of the email to delete
   * @author Justin Gray (A00426753)
   */
  function deleteEmail(email_id) {
    const emailCopy = JSON.parse(JSON.stringify(emails));
    const index = emailCopy.map((e) => e._id).indexOf(email_id);
    emailCopy.splice(index, 1);

    setEmails(emailCopy);
    setShowEmailIndices(filterEmails(emailCopy, searchVal));
  }

  /**
   * Set the flags of an email in the local state
   * @param email_id the id of the email to toggle the flag
   * @param newFlags the new flags of the email
   * @author Justin Gray (A00426753)
   */
  function flagEmail(email_id, newFlags) {
    const emailCopy = JSON.parse(JSON.stringify(emails));
    const index = emailCopy.map((e) => e._id).indexOf(email_id);

    emailCopy[index].flags = newFlags;
    setEmails(emailCopy);
  }

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
      .filter((email, index) => Math.floor(index / pageSize) + 1 == pageNum)
      .forEach((email) => {
        content.push(
          <EmailHeader
            key={email._id}
            email={email}
            isViewerSender={isSentPage}
            remove={() => deleteEmail(email._id)}
            flag={(newFlags) => flagEmail(email._id, newFlags)}
          />
        );
      });
  }

  return (
    <div>
      <p className="control has-icons-left">
        <input
          className="input is-large"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search mail"
        />
        <span className="icon is-small is-left">
          <i className="fas fa-search"></i>
        </span>
      </p>
      <br />

      <div className="box" style={{ marginBottom: 1 }}>
        {content}
      </div>

      {showEmailIndices.length <= pageSize ? null : (
        <Pagination
          itemsPerPage={pageSize}
          numItems={showEmailIndices.length}
          setPage={setPageNum}
          currentPage={pageNum}
        />
      )}
    </div>
  );
}
