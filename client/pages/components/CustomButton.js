import React from "react";
//import styles from "../../button.module.css";
import styles from "../../styles/Button.module.css";

export default function CustomButton({ type, onClick, label, disabled }) {
  
    return (
    <button className="button is-primary is-medium is-rounded"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
}


{/* <button
className="button is-block is-fullwidth is-primary is-medium is-rounded"
onClick={() => handleRouteClick("/login")}
type="submit"
disabled={false}
>
Login
</button> */}

{/* <div class="buttons">
  <button class="button is-primary">Primary</button>
  <button class="button is-link">Link</button>
</div> */}