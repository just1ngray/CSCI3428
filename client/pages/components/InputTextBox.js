import React, {useEffect, useState} from "react";
import Reply from '../Reply';


function InputTextBox({ label, rows, placeholder, text}) {   
  return (
    <div>
      <label>{label}</label>
      <textarea
        readOnly={false}
        rows={rows}
        cols={80}
        placeholder={placeholder}
        onChange={handleChange}
        value = {text}
      />
    </div>
  );
}

export default InputTextBox;