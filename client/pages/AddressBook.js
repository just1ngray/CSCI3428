/**
 * This is a Address Book Page for creating and displaying contacts
 * Users are not able to create a contact unless both name and email is entered
 *
 * Bivash Pandey (A00425523)
 */
import React, { useState } from "react";
import store from "../store";
import axios from "axios";
import defaults from "../utils/defaults";
import PageTitle from "./components/PageTitle";
import Layout from "./components/Layout";
import CustomButton from "./components/CustomButton";
import ContactList from "./components/ContactList";

export default function AddressBook() {
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

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
        setData(res.data); // {name,email,_id}
      })
      .catch((err) => {})
      .finally(() => {
        // clear the input boxes
        setName("");
        setEmail("");
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
          <br />
          <ContactList contact={data} />
        </div>
      </Layout>
    </div>
  );
}
