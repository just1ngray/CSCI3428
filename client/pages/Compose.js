/**Same For Reply.js
 * Set the local state of email components
 * posdt email
 * 
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

const serverURL = "http://ugdev.cs.smu.ca:3385/api";

export default function () {
  const router = useRouter(); // Routes inside functions.
  const [checked, setChecked] = useState([]);

  function handleSendClick() {
    const storeState = store.getState();
    
    const payload = {
      subject: storeState.subject,
      body: storeState.body,
      from: undefined, // use account's default identity according to the JWT
      to: [{ name:"todo", email:"todo" }],
      cc: [{ name:"todo", email:"todo" }],
      bcc:[{ name:"todo", email:"todo" }]
    }
    axios.post(`${serverURL}/email`, payload, {
      headers: {
        "x-auth-token": storeState.account.jwt
      }
    }).then(res => {}).catch(err=> {});
  }
  
  function handleRouteClick(route) {
    router.push(route); 
  }

  function handleBackClick() {
    router.back()
  }

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
        <InputTextBox
          label="To"
          rows="1"
        />
        <input 
          type="checkbox" 
          className= "checkBox" 
          onChange={(e) => handleCheckClick(e, "to")} 
          checked={checked.includes("to")} 
        />
        <InputTextBox 
            label="CC" 
            rows="1"  
        />
        <input 
          type="checkbox" 
          className= "checkBox" 
          onChange={(e) => handleCheckClick(e, "cc")} 
          checked={checked.includes("cc")} 
        />
        <InputTextBox
          label="Subject"
          rows="1"
        />
        <input 
          type="checkbox" 
          className= "checkBox" 
          onChange={(e) => handleCheckClick(e, "subject")} 
          checked={checked.includes("subject")} 
        />
        <BodySplitter/>
        <input 
          type="checkbox" 
          className= "checkBox" 
          onChange={(e) => handleCheckClick(e, "body")} 
          checked={checked.includes("body")} 
        />
      </div>
      <div>
        <br />
        <span>
          <p>{errMsg.length == 0 ? " " : errMsg}</p>
          <div class="buttons">
            <CustomButton
              label="Send"
              onClick={handleSendClick}
              type="button"
              disabled={checked.length < 4}
            />
            <CustomButton
              label="Back"
              onClick={() => handleBackClick()}
              type="button"
              disabled={false}
            />
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