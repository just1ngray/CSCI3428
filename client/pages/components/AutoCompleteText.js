/**
 * This file contains a component that generates input text box with autocomplete feature
 * Moreover, it validates if the inputted or selected email is valid
 *
 * Bivash Pandey (A00425523)
 */
import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import Tippy from "@tippy.js/react";
import store from "../../store";
import axios from "axios";
import defaults from "../../utils/defaults";

export default function AutoCompleteText({ label, placeholder }) {
  const [selectedOption, setSelectedOption] = useState([]);
  const [inputValue, setInputValue] = useState(null);
  const [chosenEmail, setChosenEmail] = useState(null);

  // These two variable checks if the inputted or selected email is valid
  const isValidEmail = /.+@.+\..+/.test(inputValue);
  const isValidChosenEmail = /.+@.+\..+/.test(chosenEmail);

  // This is for the email related to previously sent emails
  const [emails, setEmails] = useState([]);

  // This is for the email related to added contact into the addressbook
  const [addedInfo, setAddedInfo] = useState([]);

  // This array is used to populate the input box for autocompletion
  var emailData = [];

  // This set is used to check for the duplicate email
  var uniqueEmail = new Set();

  /**
   * This function performs authorization as well as GET request
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
   * This function performs GET request
   * Gets all the contact information that have been created by the user
   */
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    axios
      .get(`${defaults.serverUrl}/account/contacts`, {
        headers: {
          "x-auth-token": jwt,
        },
      })
      .then((response) => {
        setAddedInfo(response.data);
      });
  }, []);

  /**
   * This function keeps track of the values selected and
   * sends the email
   * @param {*} value selected value in the input box
   */
  async function handlingChange(value) {
    await setSelectedOption(value);
    store.dispatch({
      type: `set${label}`,
      payload: value.value,
    });
    setChosenEmail(value.value);
  }

  /**
   * This function handles the event when some values are changed
   * @param {*} value current text in the input box
   */
  function handlingInputChange(value) {
    setInputValue(value);
  }

  // loop through the data received from database and store in tempArray
  var tempArray = [];
  emails.forEach((element) => {
    tempArray.push(element["to"]);
  });

  // loop through tempArray and populate the emailData with unique emails
  tempArray.map((element) =>
    element.map((e) => {
      // if email is already in the set then do not add to emailData
      if (!uniqueEmail.has(e.email)) {
        emailData.push({ label: `${e.email}`, value: `${e.email}` });
      }
      uniqueEmail.add(e.email);
    })
  );

  // loop through addedInfo and populate the emailData with emails from addressBook
  addedInfo.map((e) => {
    if (!uniqueEmail.has(e.email)) {
      emailData.push({ label: `${e.email}`, value: `${e.email}` });
    }
    uniqueEmail.add(e.email);
  });

  // This function is for the styling of the autocomplete text field
  // which is used in the "To" field of compose page
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted black",
      color: state.isSelected ? "yellow" : "black",
      padding: 10,
    }),
    control: (base, state) => ({
      ...base,
      borderColor: null || isValidEmail || isValidChosenEmail ? "" : "red",
      boxShadow: state.isFocused ? null : null,
      height: 50,
    }),
  };

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
      <CreatableSelect
        options={emailData}
        placeholder={placeholder}
        isSearchable
        onChange={handlingChange}
        onInputChange={handlingInputChange}
        autoFocus
        styles={customStyles}
      />
    </div>
  );
}
