/**
 * This file contains a navigation bar with routing
 *
 * @author Nicholas Morash (A00378981)
 * @author Justin Gray (A00426753): re-vamped styling
 * @author Jay Patel (A00433907)
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
  const [isActive, setisActive] = React.useState(false);

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
        {/*navbar */}
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            {/*navbar logo at left */}
            <a href="http://www.autismnovascotia.ca/" className="navbar-item">
              <div className="is-size-3">
                <strong>AUTISM NS</strong>
              </div>
            </a>

            {/*burger */}
            <a
              onClick={() => {
                setisActive(!isActive);
              }}
              role="button"
              className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarItems"
            >
              {/* (3 lines) */}
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          {/*list of items in navbar */}
          <div
            id="navbarItems"
            className={`navbar-menu ${isActive ? "is-active" : ""}`}
          >
            <div className="navbar-end">
              <div className="navbar-item">
                {dashboardJSX}
                <span className="navbar-item">
                  <Link href="/Inbox">Inbox</Link>
                </span>
                <span className="navbar-item">
                  <Link href="/Compose">Compose</Link>
                </span>
                <span className="navbar-item">
                  <Link href="/SentItems">Sent Mail</Link>
                </span>
                <span className="navbar-item">
                  <Link href="/AddressBook">Address Book</Link>
                </span>
                {/*clearing localStorage when logging out */}
                <span
                  className="navbar-item"
                  onClick={() => {
                    console.log("Clearing localStorage");
                    localStorage.clear();
                    console.log("Localstorage cleared");
                  }}
                >
                  <Link href="/">Logout</Link>
                </span>
                <span className="navbar-item">
                  <Link href="/Settings">Settings</Link>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {children}
    </div>
  );
}
