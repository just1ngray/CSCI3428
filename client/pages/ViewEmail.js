import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import TextBox from "./components/TextBox";
import store from '../store';
import Layout from './components/StudentLayout';

export default function viewEmail() {
  const router = useRouter(); // Routes inside functions.
  let sampleEmail={
    _id: "AIJKSBDakjsdbnJKBKNL",
    __v: 1,
    date: Date.now(),
    subject: "Test Subject", 
    body: "Hello,\nThis is the body of the email.\nThanks",
    from: {
      name: "Justin Gray",
      email: "justin@gray.ca",
      _id: "account_id",
    },
    to: 
      {
        name: "Nicholas",
        email: "nick@morash.com",
        _id: "account_id2",
      },
    cc: [],
    bcc: [],
  }

  let [state, email] = useState(sampleEmail);


  const storeState = store.getState();
  if(storeState.view != undefined){
    state = useState(storeState.view);
  }
  console.log(state)
    email = state[0];
  console.log(email)

  function formatFrom() {
    if (email == undefined) return "";

    const name = email.name;
    const address = email.email;
    const formatted = name + " (" + address + ")";
    return formatted;
  }

  function formatCC() {
  //  if (email == undefined) return "";

  //  const formatted = email.cc
  //    .map((contact) => `${contact.this.name} (${contact.this.email})`)
  //    .join(" ");
  //  return formatted;
  }

  function handleReplyClick() {
    if (email == undefined) console.log("email empty!") && router.push("/Reply")
    
    store.dispatch({
      type: "setReplyEmail",
      payload: {
        _id: email._id,
        name: email.name,
        address: email.email,
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
        <PageTitle title={`VIEWING ITEM`} />{" "}
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