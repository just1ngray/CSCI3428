import Link from "next/link";
import React, { useState, useEffect } from "react";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import TextBox from "./components/TextBox";

export default function () {
  const [email, setEmail] = useState(null); // [value, function(){sets value and re-renders}]

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
      .map((contact) => `${contact.name} (${contact.email})`)
      .join(" ");
    return formatted;
  }

  function handleReplyClick() {
    //TODO Route to compose
    // Use Redux to send "from" state
  }
  function handleRouteClick(route) {
    //TODO route to "@args route"
  }

  return (
    <div>
      <div>
        <PageTitle title={`VIEWING ${"INBOX"} ITEM`} />{" "}
        {/* is user_id the from._id */}
      </div>
      <div>
        <TextBox
          label="From  "
          rows="1"
          text={formatFrom()}
          setText={"test"}
        />
        <TextBox label="CC    " rows="1" text={formatCC()} setText={undefined} />
        <TextBox
          label="Subject"
          rows="1"
          text={email !== null ? email.subject : ""}
          setText={undefined}
        />
        <TextBox
          label="Body   "
          rows="10"
          text={email !== null ? email.body : ""}
          setText={undefined}
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