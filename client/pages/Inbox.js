/**
 * Inbox that displays all inbox emails wraped in Layout with compose button.
 *
 * @author Nicholas Morash (A00378981)
 */

import React, { useState } from "react";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import { useRouter } from "next/router";
import Layout from "./components/StudentLayout";
import EmailList from "./components/EmailList";

export default function Inbox() {
  const router = useRouter();
  const [localObj, setLocalObj] = useState(localStorage.getItem("token"));

  //Routes to given route
  function handleRouteClick(route) {
    router.push(route);
  }

  return (
    <Layout>
      <PageTitle title="INBOX ITEMS" />

      {/* From, and subject horizontal alignment and padding with styles*/}
      <h4 className="card-title">
        <span>
          <u>FROM</u>
        </span>
        <span className="float-right">
          <u>SUBJECT</u>
        </span>
      </h4>
      {/* List of EmailHeader components. */}
      <EmailList token={localObj} isSent={false} />
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