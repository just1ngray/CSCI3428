
import React from "react";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";

//EachEmailInfo is like a each row of sent Items
//emailData is fake data stored in emailData.js
import EachEmailInfo from "./components/EachMailInfo";
import emailData from "./emailData";
import { useRouter } from 'next/router';
import Layout from './components/StudentLayout';

export default function SentItems() {
    const router = useRouter();
  
    function handleRouteClick(route) {
      router.push(route);
    }

  // I guess, this styling should be handled from different CSS file
  const spacingFromLeft = {
    paddingLeft: "180px",
  };

  return (
    <Layout>
      <PageTitle title="INBOX" />

      {/* To, and subject horizontal alignment and padding with styles*/}
      <h4 className="card-title">
        <span>
          <u>TO</u>
        </span>
        <span className="float-right" style={spacingFromLeft}>
          <u>SUBJECT</u>
        </span>
      </h4>

      {/* To display all the sent messages*/}
      {emailData.map((data) => (
        <EachEmailInfo key={data.num} to={data.to} subject={data.subject} />
      ))}
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
