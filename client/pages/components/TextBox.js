import React, {useEffect, useState} from "react";
import Tippy from '@tippy.js/react';


function TextBox({ label, rows, text}) {
  
  function handleHelp(helpType){
    switch(helpType){
      case "From": 
        return "This person sent you the message."
      case "To": //This to is seen in the Reply To field.
        return "This is the person you are Replying to."
      case "Subject": 
        return "The (concise) subject matter of the email."
      case "CC":
        return "Other people this message was sent to."
      case "Body":
        return "The message that you recieved."
    }
  }

  return (
    <div className="field">
      <Tippy content={handleHelp(label)}><label>{label}</label></Tippy>
      <textarea className = "textarea is-info"
        readOnly={true}
        rows={rows}
        cols={80}
        value={text}
      />
    </div>
  );
}

export default TextBox;
