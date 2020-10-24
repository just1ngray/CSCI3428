/**
 * This file contains a navigation bar with routing
 *
 * @author:
 */

// import Link to enable Routing
import Link from "next/link";
// import Head for appending elements to the 'head' of the page
import Head from "next/head";

/**
 * This function return the navigation bar with Home, New Mail and Sent Mail
 * @param {*} children contains any child elements defined within the component
 * @param {*} title the tittle of the app
 */
export default function Layout({ children, title = "Email App" }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <Link href="/StudentHome">
            <a>Home</a>
          </Link>{" "}
          |
          <Link href="/Compose">
            <a>New Mail</a>
          </Link>{" "}
          |
          <Link href="/SentItems">
            <a>Sent Mail</a>
          </Link>
        </nav>
      </header>
      {children}
      <footer>{"IN DEVELOPMENT - PROTOTYPE BUILD 4"}</footer>
    </div>
  );
}
