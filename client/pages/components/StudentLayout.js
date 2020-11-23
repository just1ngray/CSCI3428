/**
 * This file contains a navigation bar with routing
 *
 * @author Nicholas Morash (A00378981)
 */

// import Link to enable Routing
import Link from "next/link";
// import Head for appending elements to the 'head' of the page
import Head from "next/head";

/**
 * This function return the navigation bar with Home, New Mail and Sent Mail
 * @param {*} children contains any child elements defined within the component
 * @param {*} title the title of the app
 */
export default function Layout({ children, title = "Email App" }) {
  //On logout, removes data from localStorage.
  function handleClick() {
    console.log("trying to :( CLEARING LOCAL STORAGE");
    localStorage.clear();
  }

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <Link href="/Inbox">
            <a>Home</a>
          </Link>{" "}
          |==|
          <Link href="/Compose">
            <a>New Mail</a>
          </Link>{" "}
          |==|
          <Link href="/SentItems">
            <a>Sent Mail</a>
          </Link>
          |==|
          <Link href="/AddressBook">
            <a>AddressBook</a>
          </Link>
          |==|
          <Link href="/" onClick={() => handleClick()}>
            <a>Log Out</a>
          </Link>
        </nav>
      </header>
      {children}
      <footer>{"IN DEVELOPMENT - PROTOTYPE BUILD 4"}</footer>
    </div>
  );
}
