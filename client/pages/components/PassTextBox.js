import React, { useState } from "react";
import store from "../../store";
import Tippy from "@tippy.js/react";

export default function PassTextBox({ label }) {
  const [state, setState] = useState();
  async function handleChange(e) {
    const pass = e.target.value;
    await setState(pass);
    store.dispatch({
      type: `setPass`,
      payload: pass,
    });
  }

  return (
    <div>
      <Tippy content={label}>
        <label>{label}</label>
      </Tippy>
      <input
        onChange={handleChange}
        type="password"
        placeholder="Password"
        size="40"
        maxLength="200"
      />
    </div>
  );
}
