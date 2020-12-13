/**
 * Sent mailbox that displays all sent emails wraped in Layout with compose button.
 *
 * @author Nicholas Morash (A00378981)
 */

import React from "react";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import { useRouter } from "next/router";
import Layout from "./components/Layout";
import EmailList from "./components/EmailList";

export default function SentItems({ settings }) {
  const router = useRouter();

  //Routes to given route
  function handleRouteClick(route) {
    router.push(route);
  }

  return (
    <Layout>
      <PageTitle title="SENT ITEMS" />

      {/* List of EmailHeader components. */}
      <EmailList isSentPage={true} pageSize={settings.numEmail} />
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
