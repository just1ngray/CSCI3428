/** ViewEmail.js
 *
 * Email page populates data of email from users account.
 * @author Nicholas Morash (A00378981)
 */

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CustomButton from "./CustomButton";
import PageTitle from './PageTitle';
import TextBox from './TextBox';

const serverURL = "http://ugdev.cs.smu.ca:3385";

/**
 * Em,ail component
 * @param {Unique ID representing email.} id
 * @param {Unique JSONWebToken to authenticate email access} token
 * @param {Boolean flag if email is "SENT(true)" or "INBOX(false)"} userAuthor
 */
export default function Email(id, token, userAuthor) {
  const router = useRouter();
  //Initializes email state
  const [name, setName] = useState("");
  const [cc, setCC] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  //Gets email from server 'https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints'
  
  async function getReq() {    
    try {
        const req = await axios.get(
            `${serverURL}/api/email/${id}`, 
                {headers: { "x-auth-token": token }
            });
        return req;
    } catch (err) {
        const res = null
        console.log(err);
        router.back()
    }
}

const res = getReq();

  //Helper getter fuctions to populate text areas of email.
  function getTo() {
    setName(res.data.to);
    return name;
  }

  function getFrom() {
    setName(res.data.from);
    return name;
  }

  function getCC() {
    setCC(res.data.cc);
    return cc;
  }

  function getSubject() {
    setSubject(res.data.subject);
    return subject;
  }

  function getBody() {
    setEmailBody(res.data.body);
    return emailBody;
  }

  //Handles Routing
  function handleRouteClick(route) {
    router.push(route);
  }

  function handleBackClick() {
    router.back();
  }

  if (userAuthor == true) {
    //If this is a sent email diplay To instead of from.
    return (
      <div>
        <div>
          <PageTitle title="VIEWING SENT ITEM" />
        </div>
        <div>
          <TextBox
            label="To"
            rows="1"
            text={() => getFrom()}
            setText={"test"}
          />
          <TextBox
            label="CC"
            rows="1"
            text={() => getCC()}
          />
          <TextBox
            label="Subject"
            rows="1"
            text={() => getSubject()}
          />
          <TextBox
            label="Body"
            rows="10"
            text={() => getBody()}
          />
        </div>
        <div>
          <span>
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
  } else {
    //if this is a inbox email show from instead of to.
    return (
      <div>
        <div>
          <PageTitle title="VIEWING INBOX ITEM" />
        </div>
        <div>
          <TextBox
            label="From"
            rows="1"
            text={() => getFrom()}
          />
          <TextBox
            label="CC"
            rows="1"
            text={() => getCC()}
          />
          <TextBox
            label="Subject"
            rows="1"
            text={() => getSubject()}
          />
          <TextBox
            label="Body"
            rows="10"
            text={() => getBody()}
          />
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
              onClick={() => handleRouteClick("back")}
              type="button"
              disabled={false}
            />
            <CustomButton
              label="Help"
              onClick={() => handleRouteClick("help")}
              type="button"
              disabled={false}
            />
          </span>
        </div>
      </div>
    );
  }
}
