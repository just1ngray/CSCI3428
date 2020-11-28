/**
 * This is a Address Book Page for creating and displaying contacts
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
import InputTextBox from "./components/InputTextBox";
import ContactList from "./components/ContactList";

export default function AddressBook() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contact's Name"
        />
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Contact's Email"
        />
        <CustomButton
          class="button is-primary"
          label="Create Contact"
          onClick={handleCreateContact}
          type="button"
          disabled={false}
        />
        <div>
          <br />
          <ContactList contact={data} />
        </div>
      </Layout>
    </div>
  );
}
