/**
 * This file contains a navigation bar with routing
 *
 * @author Nicholas Morash (A00378981)
 * @author Justin Gray (A00426753): re-vamped styling
 */

// import Link to enable Routing
import Link from "next/link";
// import Head for appending elements to the 'head' of the page
import Head from "next/head";
import React, { useState, useEffect } from "react";

/**
 * This function return the navigation bar with Home, New Mail and Sent Mail
 * @param {*} children contains any child elements defined within the component
 * @param {*} title the title of the app
 */
export default function Layout({ children, title = "Email App" }) {
  const [accountType, setAccountType] = useState("student");

  useEffect(() => {
    const type = localStorage.getItem("accType");
    setAccountType(type || "student");
  }, []);

  const dashboardJSX =
    accountType !== "specialist" ? null : (
      <a className="navbar-item">
        <Link href="/Dashboard">Dashboard</Link>
      </a>
    );

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand" style={{ flexWrap: "wrap" }}>
            <a className="navbar-item">
              <Link href="/Inbox">Inbox</Link>
            </a>
            <a className="navbar-item">
              <Link href="/Compose">Compose</Link>
            </a>
            <a className="navbar-item">
              <Link href="/SentItems">Sent Mail</Link>
            </a>
            <a className="navbar-item">
              <Link href="/AddressBook">Address Book</Link>
            </a>
            <a
              className="navbar-item"
              onClick={() => {
                console.log("Clearing localStorage");
                localStorage.clear();
                console.log("Localstorage cleared");
              }}
            >
              <Link href="/">Logout</Link>
            </a>
            {dashboardJSX}
          </div>
        </nav>
      </header>

      {children}

      <footer>{"IN DEVELOPMENT - PROTOTYPE BUILD 4"}</footer>
    </div>
  );
}
