import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import TextBox from "./components/TextBox";
import store from '../store';
import Layout from './components/StudentLayout';

export default function viewEmail() {
  const [email, setEmail] = useState(null); // [value, function(){sets value and re-renders}]
  const router = useRouter(); // Routes inside functions.

  useEffect(() => {
    // URL query: /viewEmail/:email_id
    // get email_id

    // GET: ugdev.cs.smu.ca:338#/api/email/:id

    // npm install axios
    // import axios from 'axios';
    // axios
    //   .get("/user?ID=12345")
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })

    setEmail({
      _id: "AIJKSBDakjsdbnJKBKNL",
      __v: 1,
      date: Date.now(),
      subject: "Test Subject", 
      body: "Hello,\nThis is the body of the email.\nThanks",
      from: {
        name: "Justin",
        email: "justin@gray.ca",
        _id: "account_id",
      },
      to: [
        {
          name: "Nicholas",
          email: "nick@morash.com",
          _id: "account_id2",
        },
      ],
      cc: [],
      bcc: [],
    });
  }, []); //[] means it will only execute useEffect after first render

  function formatFrom() {
    if (email === null) return "";

    const name = email.from.name;
    const address = email.from.email;
    const formatted = name + " (" + address + ")";
    return formatted;
  }

  function formatCC() {
    if (email === null) return "";

    const formatted = email.cc
      .map((contact) => `${contact.this.name} (${contact.this.email})`)
      .join(" ");
    return formatted;
  }

  function handleReplyClick() {
    if (email === null) console.log("email empty!") && router.push("Reply.js")
    
    store.dispatch({
      type: "setReplyEmail",
      payload: {
        _id: email._id,
        name: email.from.name,
        address: email.from.email,
        subject: email.subject,
        body: email.body
      }
    });
    router.push('/Reply');
  }
  
  function handleRouteClick(route) {
    router.push(route);
  }

  function handleBackClick(){
    router.back();
  }


  return (
    <Layout>
      <div>
        <PageTitle title={`VIEWING ${"INBOX"} ITEM`} />{" "}
        {/* is user_id the from._id */}
      </div>
      <div>
        <TextBox
          label="From"
          rows="1"
          text={formatFrom()}
        />
        <TextBox label="CC" rows="1" text={formatCC()}/>
        <TextBox
          label="Subject"
          rows="1"
          text={email !== null ? email.subject : ""}
        />
        <TextBox
          label="Body"
          rows="10"
          text={email !== null ? email.body : ""}
        />
      </div>
      <div>
        <span>
          <CustomButton
            label="Reply"
            onClick={handleReplyClick}
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
    </Layout>
  );
}