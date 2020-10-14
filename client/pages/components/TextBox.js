import React from "react";

function TextBox({ label, rows, text, setText }) {
  return (
    <div>
      <label>{label}</label>
      <textarea
        readOnly={setText === undefined}
        rows={rows}
        cols={80}
        onChange={(element) => setText(element.target.value)}
      >
        {text}
      </textarea>
    </div>
  );
}

export default TextBox;
