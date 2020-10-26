/**
 * This files contains a component which makes divs clickable
 *
 * @author
 */
import React, { Children } from "react";
import { useRouter } from "next/router";
import store from "../../store";
import emailData from "../emailData";

/**
 * This function makes the div clickable
 *
 * @param {*} children contains any child elements defined within the component
 * @param {Number} id the id assiciated with an email
 */
export default function ClickableDiv({ children, id }) {
  const email = emailData[id];
  const router = useRouter();

  /**
   * This function navigates to viewEmail when div is clicked
   * @param {Number} id the id associated with an email
   */
  function handleDivClick(id) {
    store.dispatch({
      type: "setViewEmail",
      payload: {
        _id: email._id,
        name: email.from.name,
        address: email.from.email,
        toName: email.to.name,
        toAddress: email.to.email,
        subject: email.subject,
        body: email.body,
      },
    });
    store.dispatch({
      type: "currentID",
      payload: id,
    });
    console.log(id, email);
    router.push("../ViewEmail");
  }
  return <div onClick={() => handleDivClick(email.__v)}>{children}</div>;
}
