/**
 * @author: Bivash Pandey (A00425523)
 */
import React from "react";

export default function EachEmailInfo({ to, subject }) {
  //This function needs to be made functional on clicking delete button
  function handleClick(e) {
    console.log("Deleted");
  }

  return (
    <div>
      <span>
        <input type="text" value={to} readOnly />
        <input type="text" value={subject} readOnly />
        <input
          type="checkbox"
          //checked = {props.item.completed}
          //onChange = {() => props.handleChange(props.item.id)}
        />
        <button onClick={handleClick}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        {/* <CustomButton
            label="x"
            onClick={handleClick}
            type="button"
            disabled={false}
          /> */}
      </span>
    </div>
  );
}
