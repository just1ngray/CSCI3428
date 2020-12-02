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

/**
 * This component retrieves and renders a list of emails.
 * @props isSentPage    boolean, true if emails are sent mails
 */
export default function EmailListOld({ isSentPage }) {
  const [emails, setEmails] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  var completeEmail = [];
  const matchedIndex = [];
  var filteredEmails = [];

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
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        setEmails(null);
      });
  }, []);

  // automatically runs when the searchVal is changed
  useEffect(() => {
    if (searchVal.length === 0) {
      return;
    }
    // based on searchVal
  }, [searchVal]);

  // loop through the data received from database and store receivers detail in tempArray
  // store concatenation of subject and body in completeEmail array
  var tempArray = [];
  emails.forEach((element) => {
    completeEmail.push(element.subject + " " + element.body);
    tempArray.push(element["to"]);
  });

  // loop through tempArray and replace completeEmail's data by adding name and email at front
  let i = 0;
  tempArray.forEach((element) => {
    element.forEach((e) => {
      completeEmail[i] = e.name + " " + e.email + " " + completeEmail[i];
    });
    i += 1;
  });

  // loop through completeEmail array and find the index of matched word with the user's search
  // if there is a match, then store that index in matchedIndex array
  for (var j = 0; j < completeEmail.length; j++) {
    if (completeEmail[j].toLowerCase().includes(searchVal.toLowerCase())) {
      matchedIndex.push(j);
    }
  }

  // loop through matchedIndex array and filter the data that was received from database
  // store those filtered data in filteredEmails which is later used to populate the list
  for (var k = 0; k < matchedIndex.length; k++) {
    filteredEmails.push(emails[matchedIndex[k]]);
  }

  let content;
  if (!emails) content = <strong>Error: Could not retrieve emails</strong>;
  else if (emails.length == 0)
    content = <strong>You have no emails in your mailbox!</strong>;
  else {
    content = [];
    filteredEmails
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
