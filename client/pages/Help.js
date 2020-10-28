/**
 * This file displays a help page
 *
 * @author
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
      <h1>Under Construction!</h1>

      <CustomButton
        label="Back"
        onClick={() => handleBackClick()}
        type="button"
        disabled={false}
      />
    </Layout>
  );
}
