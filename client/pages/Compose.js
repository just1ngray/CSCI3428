/**Same For Reply.js
 * Set the local state of email components
 * post email
 *
 * @author Jay Patel (A00433907)
 */
import React, { useState, useEffect } from "react";
import store from "../store";
import { useRouter } from "next/router";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import InputTextBox from "./components/InputTextBox";
import BodySplitter from "./components/BodySplitter";
import Layout from "./components/Layout";
import axios from "axios";
import defaults from "../utils/defaults";
import AutoCompleteText from "./components/AutoCompleteText";
import styles from "../styles/settings.module.css";
import colourChanger from "../utils/colourChanger";

export default function Compose({ settings }) {
  const router = useRouter(); // Routes inside functions.
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    ["Subject", "To", "CC", "Body", "Greeting", "Message", "Closing"].forEach(
      (stateFieldName) => {
        store.dispatch({
          type: `set${stateFieldName}`,
          payload: " ",
        });
      }
    );
  }, []);

  function handleSendClick() {
    const storeState = store.getState();
    const jwt = localStorage.getItem("token");

    const message = [
      storeState.greeting,
      storeState.message,
      storeState.closing,
    ]
      .filter((e) => e.trim().length > 0)
      .join("\n");

    const payload = {
      subject: `${storeState.subText} `,
      body: `${message} `,
      from: undefined, // use account's default identity according to the JWT
      to: [{ email: `${storeState.toText}` }],
      cc: [{ email: `${storeState.ccText}` }],
      bcc: [],
    };

    axios
      .post(`${defaults.serverUrl}/email`, payload, {
        headers: {
          "x-auth-token": jwt,
        },
      })
      .then((res) => {
        router.push("/SentItems");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  /*handles routing */
  function handleRouteClick(route) {
    router.push(route);
  }

  /*routes to the previous page */
  function handleBackClick() {
    router.back();
  }

  /**
   * Handles the click on checkboxes
   * @author Jay Patel (A00433907)
   */
  function handleCheckClick(event, label) {
    const copyChecked = [...checked];
    if (event.target.checked) {
      if (!copyChecked.includes(label)) copyChecked.push(label);
    } else {
      const index = copyChecked.indexOf(label);
      if (index >= 0) copyChecked.splice(index, 1);
    }
    setChecked(copyChecked);
  }

  /**
   * Message to be shown when atleast one checkbox is unchecked
   * @author Jay Patel (A00433907)
   */
  let errMsg = "";
  if (!checked.includes("to")) {
    errMsg = "Remember to check the to box!";
  } else if (!checked.includes("cc")) {
    errMsg = "Remember to check the cc box!";
  } else if (!checked.includes("subject")) {
    errMsg = "Remember to check the subject box!";
  } else if (!checked.includes("body")) {
    errMsg = "Remember to check the body box!";
  }

  return (
    <Layout>
      <br />
      {/*page title*/}
      <div>
        <PageTitle title="COMPOSE EMAIL" />
      </div>
      <br />
      <div
        className="box"
        style={{ backgroundColor: colourChanger(settings.color, -12) }}
      >
        {/*div for email fields */}
        <div>
          <AutoCompleteText label="To" placeholder="" />
          <div>
            {!checked.includes("to") ? (
              <span>
                <input
                  type="checkbox"
                  className="checkBox"
                  style={{ width: 20, height: 20 }}
                  onChange={(e) => handleCheckClick(e, "to")}
                  checked={checked.includes("to")}
                />
                <label>
                  <strong>
                    Are you sending this email to the right person?
                  </strong>
                </label>
              </span>
            ) : null}
          </div>

          {/*"CC" field */}
          <InputTextBox label="CC" rows="1" isCC={true} />

          {/*checkbox for "CC" field */}
          <div>
            {!checked.includes("cc") ? (
              <span>
                <input
                  type="checkbox"
                  className="checkBox"
                  style={{ width: 20, height: 20 }}
                  onChange={(e) => handleCheckClick(e, "cc")}
                  checked={checked.includes("cc")}
                />
                <label>
                  <strong>
                    Do you want to send this email to another person or other
                    people?
                  </strong>
                </label>
              </span>
            ) : null}
          </div>

          {/*"Subject" field */}
          <InputTextBox label="Subject" rows="1" />

          {/*checkbox for "subject" field */}
          <div>
            {!checked.includes("subject") ? (
              <span>
                <input
                  type="checkbox"
                  className="checkBox"
                  style={{ width: 20, height: 20 }}
                  onChange={(e) => handleCheckClick(e, "subject")}
                  checked={checked.includes("subject")}
                />
                <label>
                  <strong>Is your subject descriptive and interesting?</strong>
                </label>
              </span>
            ) : null}
          </div>

          {/*call to a component */}
          <BodySplitter />

          {/*checkbox for "Body" field */}
          <div>
            {!checked.includes("body") ? (
              <span>
                <input
                  type="checkbox"
                  className="checkBox"
                  style={{ width: 20, height: 20 }}
                  onChange={(e) => handleCheckClick(e, "body")}
                  checked={checked.includes("body")}
                />
                <label>
                  <strong>Have you said everything you wanted to say?</strong>
                </label>
              </span>
            ) : null}
          </div>
        </div>

        {/*div of buttons */}
        <div>
          <br />
          <span>
            <p>{errMsg.length == 0 ? " " : errMsg}</p>
            <div className="buttons">
              {/*Send button */}
              <CustomButton
                label="Send"
                onClick={handleSendClick}
                type="button"
                disabled={checked.length < 4}
              />

              {/*Back button */}
              <CustomButton
                label="Back"
                onClick={() => handleBackClick()}
                type="button"
                disabled={false}
              />

              {/*Help button */}
              <CustomButton
                label="Help"
                onClick={() => handleRouteClick("/Help")}
                type="button"
                disabled={false}
              />
            </div>
          </span>
        </div>
      </div>
    </Layout>
  );
}
