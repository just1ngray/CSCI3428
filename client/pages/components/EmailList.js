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
 * This function populates the list of emails.
 * @param obj {object containin JWT data}
 * @param isSent {boolean, true if emails are sent mails}
 */
export default function EmailList({userAuthor}) {
  const [emails, setEmails] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    
    axios.get(`${defaults.serverUrl}/email/${userAuthor ? "sent" : "inbox"}`, {
      headers: { "x-auth-token": t },
    })
      .then(res => {
        setEmails(res.data);
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const content = [];
  emails.forEach(email => {
    console.log(email);
    content.push(<EmailHeader key={email._id} email={email} userAuthor={userAuthor} />);
  });

  return (
    <div className="box">
      <p>
        {content.length > 0 ? content : <strong>You have no emails in your mailbox!</strong>}
      </p>
    </div>
  );
}