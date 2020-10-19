import React from "react";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";

//EachEmailInfo is like a each row of sent Items
//emailData is fake data stored in emailData.js
import EachEmailInfo from "./components/EachMailInfo";
import emailData from "./emailData";

export default function SentItems() {
  function handleRouteClick(route) {
    //TODO route to "@args route"
  }

  // I guess, this styling should be handled from different CSS file
  const spacingFromLeft = {
    paddingLeft: "180px",
  };

  return (
    <div>
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

      {/* To display all the sent messages*/}
      {emailData.map((data) => (
        <EachEmailInfo key={data.num} to={data.to} subject={data.subject} />
      ))}
      <br />

      {/* Input, Compose and Help Button*/}
      <span>
        <CustomButton
          label="Inbox"
          onClick={() => handleRouteClick("inbox")}
          type="button"
          disabled={false}
        />
        <CustomButton
          label="Compose"
          onClick={() => handleRouteClick("compose")}
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
  );
}
