/**
 * This file contains a component which is used to generate page titles
 * dynamically
 *
 * @author: Bivash Pandey (A00425523)
 */
import React from "react";
/**
 * This function returns page title with <h2> heading
 * @param {*} title The title to be displayed
 */
function PageTitle({ title }) {
  return (
    <div className="tag is-large is-warning">
      <h2 className="title is-4">{title}</h2>
    </div>
  );
}

export default PageTitle;
