/**
 * This is a react file which will loads first
 *
 * @author
 */

//import all the CSS files
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
  return (
    <div style={{ backgroundColor: "#a2bdbc", height: "100vh" }}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
        integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA="
        crossOrigin="anonymous"
      />
      <section className="section">
        <div className="container">
          <Component {...pageProps} />
        </div>
      </section>
    </div>
  );
}

export default MyApp;
