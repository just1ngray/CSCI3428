/**
 * This is a login page with a link to account creation.
 *
 * @version 0.3.0 (with axios and createaccount)
 * @author Nicholas Morash (A00378981)
 */

/** TODO: LOGIN PAGE
 *  Simple button route similar to old app.
 */
import { useRouter } from "next/router";
import CustomButton from "./components/CustomButton";
import axios from "axios";
import { useState } from "react";

//url for axios (change to ugdev on install)
const serverURL = "http://localhost:3385";
/**
 * Main index page w/ login and link to account creation.
 *
 */
export default function () {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pword, setPword] = useState("");
  const [JWT, setJWT] = useState("");
  const [accountType, setAccountType] = useState("");

  /**
   * This function navigates to a new url when button is clicked
   * @param {*} route the url to navigate to
   */
  function handleRouteClick(route) {
    router.push(route);
  }

  const handleUserChange = (e) => {
    e.persist();
    setUser(e.target.value);
  };

  const handlePassChange = (e) => {
    e.persist();
    setPword(e.target.value);
  };

  /**
   * This functions handles the signIn, posts the username and password
   */
  async function handleSignIn() {
    try {
      //POST to server to get Response token
      const req = axios.post(`${serverURL}/api/account/login`, {
        username: user,
        password: pword,
      });
      const res = await req;
      //sets state for routing (potentially wont need)
      setJWT(res.data.token);
      setAccountType(res.data.childType);
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
    <div>
      {/* Field for email and password*/}
      <div>
        <form>
          <label>
            Email:
            <input type="text" name="name" onChange={handleUserChange} />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              onChange={handlePassChange}
            />
          </label>
        </form>
        <span>
          <CustomButton
            label="Sign In"
            disabled={false}
            onClick={() => handleSignIn()}
          />
          <CustomButton
            label="Create Account"
            disabled={false}
            onClick={() => handleRouteClick("/CreateAccount")}
          />
        </span>
      </div>
      <br />
      <div className="buttons">
        <span></span>
      </div>
    </div>
  );
}
