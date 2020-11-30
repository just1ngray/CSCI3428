/** EmailHeaeder.js
 * Displays name and subject of email.
 * OnClick will redirect to ViewEmail with emailID
 * @author Nicholas Morash (A00378981)
 */

import React from "react";
import { useRouter } from "next/router";
import * as Formatter from "../../utils/formatter";

export default function EmailHeader({ isViewerSender, email }) {
  const router = useRouter();

  let author = "";
  if (isViewerSender && email) author = Formatter.contacts(email.to);
  if (email) author = Formatter.contact(email.from);

  function formatSubject() {
    const sub = email ? email.subject : "";
    if (sub.length >= 20) {
      return sub.substring(0, 20) + "...";
    }
    return sub;
  }

  function handleClick() {
    router.push(`/ViewEmail`);
    localStorage.setItem("emailData", JSON.stringify(email));
  }

  return (
    <div onClick={handleClick}>
      <span>{author}</span>
      <span>{formatSubject()}</span>
      <span></span>
    </div>
  );
}
