import React, { useState } from "react";
import styles from "./styles/bulma.module.css";

//uncomment for router
//import { useRouter } from "next/router";

export default function Login() {
  const [person, setPerson] = useState("");
  //const router = useRouter();

  function handleChange(e) {
    //set the value as student or specialist
    setPerson(e.target.value);
  }
  function handleRouteClick(route) {
    //router.push(route);
  }
  return (
    <div className="column is-half is-offset-one-quarter">
      <div className="box">
        <div className="control has-icons-left has-icons-right">
          <input className="input is-large" type="email" placeholder="Email" />
          <span className="icon is-medium is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
        <br />
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-large"
            type="password"
            placeholder="Password"
          />
          <span className="icon is-medium is-left">
            <i className="fas fa-lock"></i>
          </span>
        </div>
        <br />
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="user"
              value="student"
              checked={person === "student"}
              onChange={handleChange}
            />
            Student
          </label>
          <label className="radio">
            <input
              type="radio"
              name="user"
              value="specialist"
              checked={person === "specialist"}
              onChange={handleChange}
            />
            Specialist
          </label>
        </div>
        <br />
        <button
          className="button is-block is-fullwidth is-primary is-medium is-rounded"
          onClick={() => handleRouteClick("/login")}
          type="submit"
          disabled={false}
        >
          Login
        </button>
        <br />
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <a href="#">Create an Account</a>
            </div>
          </div>
        </nav>
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Email App</strong> by <a href="#">Group 2</a>. Made with{" "}
            <i className="fas fa-heart"></i> in Halifax.
          </p>
        </div>
      </footer>
    </div>
  );
}
