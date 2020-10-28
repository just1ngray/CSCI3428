/** Email.js
 *
 * Email page populates data of email from users account.
 * @author Nicholas Morash (A00378981)
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CustomButton from "./CustomButton";
import PageTitle from "./PageTitle";
import TextBox from "./TextBox";
import * as Formatter from "../../utils/formatter";
import defaults from "../../utils/defaults";
import store from "../../store";

/**
 * Email component
 * @param {Unique ID representing email.} id
 * @param {Unique JSONWebToken to authenticate email access} token
 * @param {Boolean flag if email is "SENT(true)" or "INBOX(false)"} userAuthor
 */
export default function Email({userAuthor}) {
  const router = useRouter();
  const [email, setEmail] = useState({});
  
  useEffect(() => {
    const e = JSON.parse(localStorage.getItem("emailData"));
    setEmail(e);
    console.log(e);
  }, []);

  //Handles Routing
  function handleRouteClick(route) {
    router.push(route);
  }

  function handleBackClick() {
    router.back();
  }

  return (
    <div>
    <div>
      <PageTitle title="VIEWING EMAIL" />
    </div>
    <div>
      <TextBox
        label="From"
        rows="1"
        text={Formatter.contact(email.from)}
        setText={"test"}
      />
      <TextBox
        label="To"
        rows="1"
        text={Formatter.contacts(email.to)}
        setText={"test"}
      />
      <TextBox label="CC" rows="1" text={Formatter.contacts(email.cc)} />
      <TextBox
        label="Subject"
        rows="1"
        text={email.subject}
      />
      <TextBox label="Body" rows="10" text={email.body} />
    </div>
    <div>
      <span>
        <CustomButton
            label="Reply"
            onClick={() => handleRouteClick("/Reply")}
            type="button"
            disabled={false}
        />
        <CustomButton
          label="Back"
          onClick={() => handleBackClick()}
          type="button"
          disabled={false}
        />
        <CustomButton
          label="Help"
          onClick={() => handleRouteClick("/Help")}
          type="button"
          disabled={false}
        />
      </span>
    </div>
  </div>
  );
}
