/**
 * This file displays the home page of the application
 *
 * @author
 */

/** TODO: LOGIN PAGE
 *  Simple button route similar to old app.
 */
import { useRouter } from "next/router";
import CustomButton from "./components/CustomButton";
import InputTextBox from "./components/InputTextBox";
import PassTextBox from "./components/PassTextBox";
import store from "../store";
import axios from "axios";

/**
 * Routes inside functions
 */
export default function () {
  const r = useRouter();

  /**
   * This function navigates to a new url when button is clicked
   * @param {*} route the url to navigate to
   */
  function handleRouteClick(route) {
    r.push(route);
  }

  /**
   * This functions handles the signIn, posts the username and password
   */
  async function handleSignIn() {
    const storeState = store.getState();
    console.log(storeState);
    const pword = storeState.pass;
    const userEmail = storeState.signInEmail;
    console.log(pword, userEmail);
    // console.log(axios.post("http://localhost:3385/api/account/login", {username:userEmail, password: pword}))
    const loginResponse = await axios.post(
      "http://localhost:3385/api/account/login",
      { username: userEmail, password: pword }
    );
    console.log(loginResponse);
  }

  return (
    <div>
      {/* Field for email and password*/}
      <div>
        <InputTextBox label="Email" rows="1" placeholder="Email Address" />
        <PassTextBox label="Password:" />
        <CustomButton
          label="Sign In"
          onClick={() => handleSignIn()}
          type="button"
          disabled={false}
        />
      </div>
      <br />
      <div className="buttons">
        <span>
          {/* button for navigation*/}
          <CustomButton
            label="Student"
            onClick={() => handleRouteClick("/StudentHome")}
            type="button"
            disabled={false}
          />
          <CustomButton
            label="Specialist"
            onClick={() => handleRouteClick("/AdminHome")}
            type="button"
            disabled={false}
          />
          <CustomButton
            label="DEBUG: ViewEmail"
            onClick={() => handleRouteClick("/ViewEmail")}
            type="button"
            disabled={false}
          />
          <CustomButton
            label="DEBUG: Compose"
            onClick={() => handleRouteClick("/Compose")}
            type="button"
            disabled={false}
          />
          <CustomButton
            label="DEBUG: Reply"
            onClick={() => handleRouteClick("/Reply")}
            type="button"
            disabled={false}
          />
        </span>
      </div>
    </div>
  );
}
