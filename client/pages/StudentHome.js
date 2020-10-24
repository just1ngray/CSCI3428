
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

  const storeState = store.getState();
  const token = storeState.userJWT;

  return (
    <Layout>
      <PageTitle title="Inbox ITEMS" />

      {/* To, and subject horizontal alignment and padding with styles*/}
      <h4 className="card-title">
        <span>
          <u>TO</u>
        </span>
        <span className="float-right">
          <u>SUBJECT</u>
        </span>
      </h4>
      <EmailList token={token} isSent={false}/>
      <br />

      {/* Input, Compose and Help Button*/}
      <span>
        <CustomButton
          label="Sent Items"
          onClick={() => handleRouteClick("/SentItems")}
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