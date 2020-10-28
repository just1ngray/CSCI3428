/**
 * Sent mailbox that displays all sent emails wraped in Layout with compose button.
 *
 * @author Nicholas Morash (A00378981)
 */

import React from "react";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import { useRouter } from "next/router";
import Layout from "./components/StudentLayout";
import EmailList from "./components/EmailList";

export default function SentItems() {
  const router = useRouter();

  //Routes to given route
  function handleRouteClick(route) {
    router.push(route);
  }

  return (
    <Layout>
      <PageTitle title="SENT ITEMS" />

      {/* To, and subject horizontal alignment and padding with styles*/}
      <h4 className="card-title">
        <span>
          <u>To</u>
        </span>
        <span className="float-right">
          <u>SUBJECT</u>
        </span>
      </h4>
      {/* List of EmailHeader components. */}
      <EmailList userAuthor={true} />
      <br />

      {/* Input, Compose and Help Button*/}
      <span>
        <CustomButton
          label="Inbox"
          onClick={() => handleRouteClick("/Inbox")}
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