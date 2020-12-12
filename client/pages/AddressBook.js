/**
 * This is a Address Book Page for creating and displaying contacts
 * Users are not able to create a contact unless both name and email is entered
 *
 * @author Bivash Pandey (A00425523)
 * @author Justin Gray (A00426753) - added delete option & state improvements
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import defaults from "../utils/defaults";
import PageTitle from "./components/PageTitle";
import Layout from "./components/Layout";
import CustomButton from "./components/CustomButton";
import ContactRow from "./components/ContactRow";

export default function AddressBook() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    axios
      .get(`${defaults.serverUrl}/account/contacts`, {
        headers: {
          "x-auth-token": jwt,
        },
      })
      .then((res) => setContacts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // These variables are for checking if the Name and Email is valid
  const isValidName =
    (name || "").length > 0 && RegExp(/^\p{L}/, "u").test(name);
  const isValidEmail = /.+@.+\..+/.test(email);

  /**
   * This function perform POST request
   * Creates a contact with Name & Email
   */
  function handleCreateContact() {
    const jwt = localStorage.getItem("token");
    const payload = {
      name: `${name}`,
      email: `${email}`,
    };
    axios
      .post(`${defaults.serverUrl}/account/contact`, payload, {
        headers: {
          "x-auth-token": jwt,
        },
      })
      .then((res) => {
        const cloneContacts = JSON.parse(JSON.stringify(contacts));
        cloneContacts.push(res.data);
        setContacts(cloneContacts);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        // clear the input boxes
        setName("");
        setEmail("");
      });
  }

  /**
   * Deletes a contact from the local state of the application
   * @param {string} email the email of the contact
   * @author Justin Gray
   */
  function deleteContact(email) {
    const jwt = localStorage.getItem("token");
    axios
      .delete(`${defaults.serverUrl}/account/contact/${email}`, {
        headers: {
          "x-auth-token": jwt,
        },
      })
      .then(() => {
        const cloneContacts = JSON.parse(JSON.stringify(contacts)).filter(
          (c) => c.email !== email
        );
        setContacts(cloneContacts);
      })
      .catch((err) => {
        alert("Could not delete contact\n" + err);
      });
  }

  return (
    <div>
      <Layout>
        <br />
        <div>
          <PageTitle title="ADDRESS BOOK" />
        </div>
        <br />
        <div className="field">
          <div className="control">
            <input
              className={`input is-medium ${
                name == null || isValidName ? "" : "is-danger"
              }`}
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contact's Name"
              maxLength={128}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className={`input is-medium ${
                email == null || isValidEmail ? "" : "is-danger"
              }`}
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Contact's Email"
              maxLength={256}
            />
          </div>
        </div>
        <div className="control">
          <CustomButton
            class="button is-primary"
            label="Create Contact"
            onClick={handleCreateContact}
            type="submit"
            disabled={!isValidName || !isValidEmail}
          />
        </div>
        <div>
          <ContactRow
            isHeader={true}
            contact={{ name: "Name", email: "Email" }}
          />
          {contacts.map((c) => (
            <ContactRow
              key={`${c.name};${c.email}`}
              contact={c}
              remove={() => deleteContact(`${c.email}`)}
            />
          ))}
        </div>
      </Layout>
    </div>
  );
}
