/**
 * This is a login page with a link to account creation.
 *
 * @version 0.4.0 (with axios and createaccount)
 * @author Nicholas Morash (A00378981) - v0.3.0
 * @author Justin Gray (A00426753) - v0.4.0
 * @author Bivash Pandey (A00425523) - layout: spacing and centering
 * @author Tiffany Conrad (A00414194) -Student memo
 */
import { useRouter } from "next/router";
import CustomButton from "./components/CustomButton";
import axios from "axios";
import React, { useState, useEffect } from "react";
import defaults from "../utils/defaults";

/**
 * Main index page w/ login and link to account creation.
 * Redirects if the user is already logged in.
 */
export default function () {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pword, setPword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/Inbox");
  }, []);

  /**
   * This function navigates to a new url when button is clicked
   * @param {*} route the url to navigate to
   */
  function handleRouteClick(route) {
    router.push(route);
  }

  /**
   * This functions handles the signIn, posts the username and password
   */
  async function handleSignIn() {
    try {
      //POST to server to get Response token
      const req = axios.post(`${defaults.serverUrl}/account/login`, {
        username: user,
        password: pword,
      });
      const res = await req;
      //sets localStorage for JWT persistance.
      localStorage.setItem("accType", res.data.childType);
      localStorage.setItem("token", res.data.token);
      //routes.
      router.push("/Inbox");
    } catch (err) {
      console.log(err);
      alert("Incorrect email or password, please try again.");
    }
  }

  return (
    <div className="column is-half is-offset-one-quarter">
      <div className="box">
        <form onSubmit={(e) => e.preventDefault()}>
          <article className="message is-info">
            <div className="message-header">
              <p>Attention Students!</p>
            </div>
            <div className="message-body">
              Please contact a specialist if you do not currently have an
              account!
            </div>
          </article>
          <label>
            Email:
            <input
              className="input is-large"
              type="email"
              name="name"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
            <br />
          </label>
          <br />
          <label>
            Password:
            <input
              className="input is-large"
              type="password"
              name="password"
              onChange={(e) => setPword(e.target.value)}
              value={pword}
            />
            <br />
          </label>
          <br />
          <div className="buttons is-centered">
            <CustomButton
              type="submit"
              label="Sign In"
              disabled={false}
              onClick={() => handleSignIn()}
            />
            <CustomButton
              label="Create Specialist Account"
              disabled={false}
              onClick={() => handleRouteClick("/CreateAccount")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
