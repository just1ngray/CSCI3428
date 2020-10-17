import React, {useEffect, useState} from "react";



function TextBox({ label, rows, text}) {
  
  return (
    <div>
      <label>{label}</label>
      <textarea
        readOnly={true}
        rows={rows}
        cols={80}
        value={text}
      />
    </div>
  );
}

export default TextBox;
