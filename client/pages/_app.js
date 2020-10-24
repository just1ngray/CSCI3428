
import "../styles/globals.css";
import "../styles/bulma.css";
import 'tippy.js/dist/tippy.css';

function MyApp({ Component, pageProps }) {

  return(
  <div style={{backgroundColor: '#a2bdbc'}}>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
  <body>
    <section className="section">
      <div className="container">
      <Component {...pageProps}/>
      </div>
    </section>
  </body>
  </div>
  );
}

export default MyApp;

