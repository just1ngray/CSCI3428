/**
 * This is a react file which will loads first
 *
 * @author Bivash Pandey (A00425523) - Load settings from local storage, apply new theme
 *
 */

//import all the CSS files
import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import "../styles/bulma.css";
import "tippy.js/dist/tippy.css";

import axios from "axios";
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.pathname = "/";
    } else return Promise.reject(err);
  }
);

/**
 * This function applies CSS to website and loads other funtions as needed
 *
 * @param {*} Components child components passed
 * @param {*} pageProps
 */
function MyApp({ Component, pageProps }) {
  // Bivash Pandey (A00425523) - Start
  const [settings, setSettings] = useState({
    color: "#64b5f6",
    numEmail: 20,
  });
  // get the user settings from local storage
  useEffect(() => {
    const userSettings = localStorage.getItem("settings");
    if (userSettings) setSettings(JSON.parse(userSettings));
  }, []);

  let color = settings["color"] ? settings.color : "#64b5f6";
  // Bivash Pandey (A00425523) - End

  return (
    <div
      style={{
        backgroundColor: color,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
        integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA="
        crossOrigin="anonymous"
      />
      <section className="section" style={{ flexGrow: 100 }}>
        <div className="container">
          <Component {...pageProps} settings={settings} />
        </div>
      </section>

      <footer className="container" style={{ textAlign: "center" }}>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => window.open("https://github.com/just1ngray/CSCI3428")}
        >
          Open Source Software
        </span>
        &nbsp;Developed in CSCI 3428 at&nbsp;
        <span
          style={{ cursor: "pointer" }}
          onClick={() => window.open("http://cs.smu.ca")}
        >
          Saint Mary's University
        </span>
        <p>Fall 2020</p>
      </footer>
    </div>
  );
}

export default MyApp;
