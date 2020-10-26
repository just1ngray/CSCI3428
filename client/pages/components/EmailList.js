/**
 * This file displays a list of EmailHeader components in Sent Items and Inbox
 *
 * @author Nicholas Morash (A00378981)
 * @author Bivash ... 
 */

import React from "react";
import axios from "axios";
//import EmailHeader from "./EmailHeader";

const serverURL = "http://localhost:3385";

/**
 * This function populates the list of emails.
 * @param obj {object containin JWT data}
 * @param isSent {boolean, true if emails are sent mails}
 */
export default function EmailList(obj, isSent) {
  //sets API enpoint to sent or inbox
  let endpoint = "";
  if (isSent) {
    endpoint = "sent";
  } else {
    endpoint = "inbox";
  }

  //Gets inbox/sent.
  const req = axios.get(`${serverURL}/api/email/${endpoint}`, {
    headers: { "x-auth-token": obj.token },
  });
  const res = req;
  const emails = res.data;

  //Displays a no emails msg if mailbox is empty.
  if (!emails) {
    return (
      <div className="box">
        <p>
          <strong>You have no emails in your mailbox!</strong>
        </p>
      </div>
    );
  } else {
    //Generates an email header for each email ID
    for (let i = 0; i < emails.length; i++) {
      return <EmailHeader id={emails[i].id} token={obj.token} didAuthor={isSent}/>;
    }
  }
}