/**
 * This file displays a help page with helpful links to emailing resources 
 *
 * @author Tiffany Conrad (A00414194)
 */
import React from "react";
import Layout from "./components/StudentLayout";
import { useRouter } from "next/router";
import CustomButton from "./components/CustomButton";

/**
 * This function displays a help page
 */
export default function Help() {
  const router = useRouter();

  /**
   * This function navigates back to a page when back button is clicked
   */
  function handleBackClick() {
    router.back();
  }
  return (
    <Layout>
      <h1>Helpful Links for Writing Emails</h1>

      <ul>
        <li><a href="https://www.grammarly.com/blog/email-writing-tips/">Grammarly</a></li>
        <li><a href="https://studio.smu.ca/ac-resources/professional-emails?rq=emai">Saint Mary's University</a></li>
        <li><a href="https://owl.purdue.edu/owl/general_writing/academic_writing/email_etiquette.html">Owl Purdue</a></li>
      </ul>

      <CustomButton
        className="button is-warning"
        label="Back"
        onClick={() => handleBackClick()}
        type="button"
        disabled={false}
      />
    </Layout>
  );
}
