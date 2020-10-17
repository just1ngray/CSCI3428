
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store";

function MyApp({ Component, pageProps }) {

  return(
      <Component {...pageProps} />
  );
}

export default MyApp;