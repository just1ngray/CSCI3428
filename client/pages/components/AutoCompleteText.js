/**
 * This file contains a component that generates input text box with autocomplete feature
 *
 * Bivash Pandey (A00425523)
 */

//NOTE: I couldn't figure out why autocompletetext.module.css is not showing effect in this project

import React from "react";
import { useState, useEffect } from "react";
import "../../styles/autocompletetext.module.css";
import Tippy from "@tippy.js/react";
import store from "../../store";
import axios from "axios";
import defaults from "../../utils/defaults";

export default function AutoCompleteText({ label, placeholder }) {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");
  const [emails, setEmails] = useState([]);

  // empty array to hold sent emails list
  var sentEmails = [];

  /**
   * This function performs authorization as well as GET request
   *
   */
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    axios
      .get(`${defaults.serverUrl}/email/sent`, {
        headers: {
          "x-auth-token": jwt,
        },
      })
      .then((response) => {
        setEmails(response.data);
      });
  }, []);

  /**
   * This function handles the event when some values are changed
   * @param {*} e the event triggered when values are changed
   */
  async function onTextChanged(e) {
    const value = e.target.value;
    let suggestion = [];

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestion = sentEmails.sort().filter((v) => regex.test(v));
    }
    setSuggestions(suggestion);
    await setText(value);

    store.dispatch({
      type: `set${label}`,
      payload: value,
    });
  }

  // Note: I got stuck while accessing 'to' email and I end up having 3 .map()
  // and 2 nested for-loop so, I left it for now considering the efficiency
  sentEmails = emails.map((e) => e.from.email);

  /**
   * This function sets suggestions to null when user selects any
   * email form the autosuggest and sets the value of text as email
   *
   */
  function suggestionSelected(value) {
    setSuggestions([]);
    setText(value);
  }

  /**
   * This function returns null if user has typed zero characters
   * otherwise, it displays the suggested list based on users
   * dynamic input
   *
   */
  function renderSuggestions() {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item) => (
          <li onClick={() => suggestionSelected(item)}>{item}</li>
        ))}
      </ul>
    );
  }

  /**
   * This function retuns the help string
   * @param {String} helpType word to be passed in switch statement
   */
  function handleHelp(helpType) {
    switch (helpType) {
      case "To":
        return "Enter the recipient email address here.";
      case "CC":
        return "Enter an additional recipient here.";
      case "Subject":
        return "Enter a concise subject for your email.";
      case "Body":
        return "Compose your message here.";
      case "Greeting":
        return "Part of the message, this is how you greet your recipient.";
      case "Message":
        return "This is the main section of your email.";
      case "Closing":
        return "Part of the message, this is where you say goodbye to your recipient.";
      default:
        return "";
    }
  }

  return (
    <div>
      <Tippy content={handleHelp(label)}>
        <label>
          <strong>{label}</strong>
        </label>
      </Tippy>
      <div className="AutoCompleteText">
        <input
          className="input"
          value={text}
          onChange={onTextChanged}
          type="text"
          placeholder={placeholder}
        />
        {renderSuggestions()}
      </div>
    </div>
  );
}
