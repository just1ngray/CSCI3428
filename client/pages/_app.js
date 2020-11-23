/**
 * This is a react file which will loads first
 *
 * @author
 */

//import all the CSS files
import "../styles/globals.css";
import "../styles/bulma.css";
import "tippy.js/dist/tippy.css";
import "../styles/Accordion.module.css"

/**
 * This function applies CSS to website and loads other funtions as needed
 *
 * @param {*} Components child components passed
 * @param {*} pageProps
 */
function MyApp({ Component, pageProps }) {
  return (
    <div style={{ backgroundColor: "#a2bdbc" }}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
        integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA="
        crossOrigin="anonymous"
      />
      <body>
        <section className="section">
          <div className="container">
            <Component {...pageProps} />
          </div>
        </section>
      </body>
    </div>
  );
}

export default MyApp;
