/**
 * This file displays a list of email in Sent Items and Inbox
 *
 * @author
 */

import React from "react";
import ClickableDiv from "./ClickableDiv";
import EachEmailInfo from "./EachMailInfo";
import emailData from "../emailData";

/**
 * This function populates the list of emails
 */
export default function EmailList() {
  for (let i = 0; i < 5; i++) {
    const currentEmail = emailData[i];
    return (
      // clickable div component of a email list
      <ClickableDiv id={i}>
        <EachEmailInfo
          key={currentEmail._id}
          to={`${currentEmail.from.name} (${currentEmail.from.email})`}
          subject={currentEmail.subject}
        />
      </ClickableDiv>
    );
  }
}
