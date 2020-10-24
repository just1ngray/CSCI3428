/**
 * @author: Bivash Pandey (A00425523)
 * @author: Nicholas Morash (A00378981)
 */
import React from "react";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import { useRouter } from 'next/router';
import Layout from './components/StudentLayout';
import EmailList from "./components/EmailList";
import store from "../store";

export default function SentItems() {
  const router = useRouter();
  
  function handleRouteClick(route) {
    router.push(route);
  }

  function handleBackClick() {
    router.back();
  }

  const storeState = store.getState();
  //TODO IMPLEMENT LOCAL STORAGE

  return (
    <Layout>
      <PageTitle title="SENT ITEMS" />

      {/* To, and subject horizontal alignment and padding with styles*/}
      <h4 className="card-title">
        <span>
          <u>TO</u>
        </span>
        <span className="float-right" style={spacingFromLeft}>
          <u>SUBJECT</u>
        </span>
      </h4>
      <EmailList token={token} isSent={true}/>
      <br />

      {/* Input, Compose and Help Button*/}
      <span>
        <CustomButton
          label="Sent Items"
          onClick={() => handleBackClick()}
          type="button"
          disabled={false}
        />
        <CustomButton
          label="Compose"
          onClick={() => handleRouteClick("/Compose")}
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
    </Layout>
  );
}