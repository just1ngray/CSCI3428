/**
 * This file displays a reply page with cc, subject, and body section
 *
 * @author
 */
import React, {useState, useEffect} from 'react';
import store from "../store";
import { useRouter } from "next/router";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import TextBox from "./components/TextBox";
import InputTextBox from "./components/InputTextBox";
import Layout from "./components/StudentLayout";
import defaults from "../utils/defaults";
import * as Formatter from "../utils/formatter";
import axios from 'axios';
/**
 * This function returns the reply page
 */
export default function Reply() {
  const router = useRouter(); // Routes inside functions.
  const [email, setEmail] = useState({})
  
  useEffect(() => {
    const e = JSON.parse(localStorage.getItem("emailData"));
    setEmail(e);
    console.log(e);
  }, []);

  /**
   * This function return the formatted 'TO' section
   */
  function formatTo() {
    try {
      const formatted = Formatter.contact(email.from);
      return formatted;
    } catch (err) {
      return "";
    }
  }

  /**
   * This function returns the formatted subject section
   */
  function formatSubject() {
    try {
      const formatted = email.subject;
      store.dispatch({
        type: "setSubject",
        payload: "RE: " + formatted
      });
      return "RE: " + formatted;
    } catch (err) {
      return "";
    }
  }

  /**
   * This function returns the formatted body section
   */
  function formatBody() {
    try {
      const prefix = "---------- QUOTED MESSAGE ----------\n";
      const suffix = "\n---------- END OF QUOTE ------------\n";
      const formatted = email.body;
      store.dispatch({
        type: "setBody",
        payload: prefix + formatted + suffix
      });
      return prefix + formatted + suffix;
    } catch (err) {
      return "";
    }
  }

  /**
   * This function passes the data when Send button is clicked
   */
  function handleSendClick() {
    const storeState = store.getState();
    const jwt = localStorage.getItem("token");

    const payload = {
      subject: `${storeState.subText}`,
      body: `${storeState.bodyText}`,
      from: undefined, // use account's default identity according to the JWT
      to: [{ email: email.from.email }],
      cc: [],
      bcc: []
    }

    console.log(storeState);
    console.log(payload);
    
    axios.post(`${defaults.serverUrl}/email`, payload, {
      headers: {
        "x-auth-token": jwt
      }
    }).then(res => {router.push("/Inbox")}).catch(err=> {});
  }

  /**
   * This function routes to back page when back button is clicked
   */
  function handleBackClick() {
    router.back();
  }

  /**
   * This function navigates to a new url when button is clicked
   * @param {*} route the url to navigate to
   */
  function handleRouteClick(route) {
    router.push(route);
  }

  if (email.body === undefined) return <div></div>; //internal bleed: bandaid fix

  return (
    <Layout>
      <div>
        <PageTitle title={`COMPOSING ${"REPLY"}`} />{" "}
        {/* is user_id the from._id */}
      </div>
      <div>
        <TextBox label="To" rows="1" text={formatTo()} />
        <InputTextBox label="CC" rows="1" text="" />
        <InputTextBox label="Subject" rows="1" text={formatSubject()} />
        <InputTextBox label="Body" rows="10" text={formatBody()} />
      </div>
      <br />
      <div className="buttons">
        <span>
          <CustomButton
            label="Send"
            onClick={() => handleSendClick()}
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
