/**
 * This file contains a component that generates input text box with different properties
 *
 * @author:
 */

import React, { useState } from "react";
import store from "../../store";
import Tippy from "@tippy.js/react";

/**
 * This function returns a textbox
 * @param {*} label the label for textbox
 */
export default function PassTextBox({ label }) {
  // variable state for initial state and setState is to set the state
  const [state, setState] = useState();

  /**
   * This function handle the even when some values are changed
   * @param {*} e the event triggered when values are changed
   */
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
