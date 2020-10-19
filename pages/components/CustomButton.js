import React from "react";
//import styles from "../../button.module.css";
import styles from "../../styles/Button.module.css";

export default function CustomButton({ type, onClick, label, disabled }) {
  
    return (
    <button
      className={styles.buttonslicein}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
}