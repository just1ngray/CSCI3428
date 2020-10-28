/**
 * This file contains a component which is used to generate page titles
 * dynamically
 *
 * @author:
 */
import React from "react";
/**
 * This function returns page title with <h2> heading
 * @param {*} title The title to be displayed
 */
function PageTitle({ title }) {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}

export default PageTitle;
