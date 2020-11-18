/**Same For Reply.js
 * Set the local state of email components
 * posdt email
 * 
 * @author Jay Patel (A00433907)
 */
import { useState } from "react";
import store from '../store';
import { useRouter } from 'next/router';
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import InputTextBox from './components/InputTextBox';
import BodySplitter from './components/BodySplitter';
import Layout from './components/StudentLayout';
import axios from "axios";
import Tippy from "@tippy.js/react";
import defaults from "../utils/defaults";

export default function () {
  const router = useRouter(); // Routes inside functions.
  const [checked, setChecked] = useState([]);

  function handleSendClick() {
    const storeState = store.getState();
    const jwt = localStorage.getItem("token");

    const payload = {
      subject: `${storeState.subText}`,
      body: `${storeState.greeting}\n${storeState.message}\n${storeState.closing}`,
      from: undefined, // use account's default identity according to the JWT
      to: [{ email:`${storeState.toText}`}],
      cc: [],
      bcc: []
    }
    
    axios.post(`${defaults.serverUrl}/email`, payload, {
      headers: {
        "x-auth-token": jwt
      }
    }).then(res => {router.push("/Inbox")}).catch(err=> {});
  }
  
  function handleRouteClick(route) {
    router.push(route); 
  }

  {/*This function handles the back button */}
  function handleBackClick() {
    router.back()
  }

  {/*This function handles a click on the checkboxes */}
  function handleCheckClick(event, label) {
    const copyChecked = [...checked];
    if (event.target.checked) {
      if (!copyChecked.includes(label)) copyChecked.push(label);
    } else {
      const index = copyChecked.indexOf(label);
      if (index >= 0) copyChecked.splice(index, 1); 
    }
    setChecked(copyChecked);
  }

  {/*Message to be displayed when any checkbox is unchecked */}
  let errMsg = "";
  if (!checked.includes("to")) {
    errMsg = "Remember to check the to box!";
  } else if (!checked.includes("cc")) {
    errMsg = "Remember to check the cc box!";
  } else if (!checked.includes("subject")) {
    errMsg = "Remember to check the subject box!";
  } else if (!checked.includes("body")) {
    errMsg = "Remember to check the body box!";
  }

  return (
    <Layout>
      <div>
        <PageTitle title={`COMPOSING MESSAGE`} />{" "}
        {/* is user_id the from._id */}
      </div>

      <div>

        {/*call to InputTextBox for 'to' */}
        <InputTextBox
          label="To"
          rows="1"
        />

        {/*checkbox for 'To' */}
        <div>
          {!checked.includes("to") ? (<span><input 
            type="checkbox" 
            className= "checkBox" 
            style={{width:20, height:20}}
            onChange={(e) => handleCheckClick(e, "to")} 
            checked={checked.includes("to")} 
          />
          <label><strong>Are you sending this email to the right person?</strong></label></span>) : null }
        </div>

        {/*fields for 'CC' */}
        <InputTextBox 
            label="CC" 
            rows="1"  
        />
        
        {/*checkbox for 'CC' */}
        <div>
          {!checked.includes("cc") ? 
          (<span><input 
          type="checkbox" 
          className= "checkBox" 
          style={{width:20, height:20}}
          onChange={(e) => handleCheckClick(e, "cc")} 
          checked={checked.includes("cc")} 
        /></span>) : null}
        </div>

        {/*call to InputTextBox for 'subject' */}
        <InputTextBox
          label="Subject"
          rows="1"
        />

        {/*checkbox for subject */}
        <div>
          {!checked.includes("subject") ? (<span><input 
            type="checkbox" 
            className= "checkBox" 
            style ={{width:20, height:20}}
            onChange={(e) => handleCheckClick(e, "subject")} 
            checked={checked.includes("subject")} 
          />
          <label><strong>Is your subject descriptive and interesting?</strong></label></span>) : null}
        </div>

        {/*Call to BodySplitter */}
        <BodySplitter/>

        {/*checkbox for Body */}
        <div>
          {!checked.includes("body") ?
          (<span><input 
            type="checkbox" 
            className= "checkBox"
            style={{width:20, height:20}} 
            onChange={(e) => handleCheckClick(e, "body")} 
            checked={checked.includes("body")} 
          />
          <label><strong>Have you said everything you wanted to say?</strong></label></span>) : null}
        </div>
      </div>

      {/*Buttons */}
      <div>
        <br />
        <span>
          <p>{errMsg.length == 0 ? " " : errMsg}</p>
          <div class="buttons">
            {/*Send button */}
            <CustomButton
              label="Send"
              onClick={handleSendClick}
              type="button"
              disabled={checked.length < 4}
            />
            {/*Back button */}
            <CustomButton
              label="Back"
              onClick={() => handleBackClick()}
              type="button"
              disabled={false}
            />
            {/*Help button */}
            <CustomButton
              label="Help"
              onClick={() => handleRouteClick("/Help")}
              type="button"
              disabled={false}
            />
          </div>
        </span>
        
      </div>
    </Layout>
  );
}