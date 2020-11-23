/**
 * This is a Address Book Page for creating and displaying contacts
 *
 * Bivash Pandey (A00425523)
 */
import React from "react";
import store from "../store";
import axios from "axios";
import defaults from "../utils/defaults";
import PageTitle from "./components/PageTitle";
import Layout from "./components/StudentLayout";
import CustomButton from "./components/CustomButton";
import InputTextBox from "./components/InputTextBox";
import ContactList from "./components/ContactList";

export default function AddressBook() {
  /**
   * This function perform POST request
   * Creates a contact with Name & Email
   */
  function handleCreateContact() {
    const storeState = store.getState();
    const jwt = localStorage.getItem("token");
    const payload = {
      name: `${storeState.contactName}`,
      email: `${storeState.signInEmail}`,
    };
    axios
      .post(`${defaults.serverUrl}/account/contact`, payload, {
        headers: {
          "x-auth-token": jwt,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  }

  return (
    <div>
      <Layout>
        <br />
        <div>
          <PageTitle title="ADDRESS BOOK" />
        </div>
        <InputTextBox label="Name" rows="1" />
        <InputTextBox label="Email" rows="1" />
        <CustomButton
          class="button is-primary"
          label="Create Contact"
          onClick={handleCreateContact}
          type="button"
          disabled={false}
        />
        <div>
          <br />
          <ContactList />
        </div>
      </Layout>
    </div>
  );
}