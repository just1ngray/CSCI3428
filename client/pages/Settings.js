/**
 * This is the setting page that lets user select a theme
 * and number of emails to be displayed in a page.
 * Page gets refreshed after user apply the changes
 *
 * @author Bivash Pandey (A00425523)
 */

import React, { useState, useEffect } from "react";
import PageTitle from "./components/PageTitle";
import Layout from "./components/Layout";
import CustomButton from "./components/CustomButton";
import styles from "../styles/settings.module.css";

export default function Settings() {
  const [color, setColor] = useState("");
  const [numEmail, setNumEmail] = useState("");
  const [settings, setSettings] = useState({});
  const [prevSettings, setPreviousSettings] = useState({
    color: "#64b5f6",
    numEmail: "20",
  });

  // get the previous user settings from the local storage
  useEffect(() => {
    const storedSettings = localStorage.getItem("settings");
    // if there is previous setting then make current to previous
    if (storedSettings && Object.entries(storedSettings).length != 0) {
      setPreviousSettings(JSON.parse(storedSettings));
    }
  }, []);

  function saveSettings() {
    // if user apply changes by selecting any one (theme or email)
    // then use the unchanged one from the previous user setting
    if (color.length === 0) setColor(prevSettings.color);
    if (numEmail.length === 0) setNumEmail(prevSettings.numEmail);
    let newSettings = {
      color: color.length === 0 ? prevSettings.color : color,
      numEmail: numEmail.length === 0 ? prevSettings.numEmail : numEmail,
    };
    setSettings(newSettings);

    // saves user settings in the local storage
    localStorage.setItem("settings", JSON.stringify(newSettings));
    // reloads the page to apply the effect
    window.location.reload();
  }

  return (
    <Layout>
      <br />
      <div>
        <PageTitle title="SETTINGS" />
      </div>
      <br />
      <div className="box">
        <article className="message is-dark">
          <div className="message-header">Customize your application</div>
          <div className="message-body">
            <p>Please select your theme</p>
            <div className="buttons">
              <button
                className={`${styles.button} ${styles.button1}`}
                onClick={() => setColor("#81d4fa")}
              />
              <button
                className={`${styles.button} ${styles.button2}`}
                onClick={() => setColor("#f48fb1")}
              />
              <button
                className={`${styles.button} ${styles.button3}`}
                onClick={() => setColor("#ffab91")}
              />
              <button
                className={`${styles.button} ${styles.button4}`}
                onClick={() => setColor("#a5d6a7")}
              />
              <button
                className={`${styles.button} ${styles.button5}`}
                onClick={() => setColor("#9fa8da")}
              />
              <button
                className={`${styles.button} ${styles.button6}`}
                onClick={() => setColor("#b39ddb")}
              />
              <button
                className={`${styles.button} ${styles.button7}`}
                onClick={() => setColor("#ffcc80")}
              />
              <button
                className={`${styles.button} ${styles.button8}`}
                onClick={() => setColor("#e0e0e0")}
              />
            </div>
            <p>How many emails do you want to display in a page?</p>
            <div className="select">
              <select
                onChange={(e) => {
                  setNumEmail(e.target.value);
                }}
                defaultValue={"Choose"}
              >
                <option value="Choose" disabled>
                  Choose
                </option>
                <option value="20">20</option>
                <option value="35">35</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
            </div>
            <br />
            <div className="buttons is-centered">
              <CustomButton
                className="button is-primary"
                label="Apply Changes"
                onClick={saveSettings}
              />
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
