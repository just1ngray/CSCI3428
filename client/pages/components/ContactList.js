/**
 * Creates and populates the table with user Name and Email
 *
 * Bivash Pandey (A00425523)
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import defaults from "../../utils/defaults";

export default function ContactList({ contact }) {
  // This is for the data related to sent emails
  const [sentInfo, setSentInfo] = useState([]);
  // This is for the data related to added contact
  const [addedInfo, setAddedInfo] = useState([]);

  // add recently created into addedInfo
  addedInfo.push(contact);

  // This array will store the name and email
  var contactInfo = [];
  // This set is used to check for the duplicate email
  const seen = new Set();

  /**
   * This function performs GET request
   * Gets all the contact information from the sent Emails
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
        setSentInfo(response.data);
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

  // loop through addedInfo and populate the contact Info with name & email
  addedInfo.map((e) => {
    contactInfo.push({ name: `${e.name}`, email: `${e.email}` });
  });

  // loop through the data received from database and store in tempArray
  var tempArray = [];
  sentInfo.forEach((element) => {
    tempArray.push(element["to"]);
  });

  // loop through tempArray and populate the contact Info with name & email
  tempArray.map((element) =>
    element.map((e) => {
      contactInfo.push({ name: `${e.name}`, email: `${e.email}` });
    })
  );

  // removing data with duplicate emails
  const uniqueContactInfo = contactInfo.filter((person) => {
    const duplicate = seen.has(person.email);
    seen.add(person.email);
    return !duplicate;
  });

  // case insensitive sorting based on Name
  uniqueContactInfo.sort(function (a, b) {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  // return table filled with data
  return (
    <table className="table is-bordered is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {uniqueContactInfo.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
