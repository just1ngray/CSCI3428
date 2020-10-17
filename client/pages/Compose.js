/**Same For Reply.js
 * Set the local state of email components
 * posdt email
 * 
 */

import store from '../store';
import { useRouter } from 'next/router';
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import TextBox from "./components/TextBox";

export default function () {
  const router = useRouter(); // Routes inside functions.
  const storeState = store.getState();
  const pageState = storeState[0];


  function handleSendClick() {

  }
  
  function handleRouteClick(route) {
    router.push(route);
  }

  return (
    <div>
      <div>
        <PageTitle title={`VIEWING ${"INBOX"} ITEM`} />{" "}
        {/* is user_id the from._id */}
      </div>
      <div>
        <TextBox
          label="To"
          rows="1"
          text={formatTo()}
          setText={undefined}
        />
        <TextBox 
            label="CC" 
            rows="1" 
            text="" 
            setText={true} 
        />
        <TextBox
          label="Subject"
          rows="1"
          text=""
          setText={true}
        />
        <TextBox
          label="Body"
          rows="10"
          text={formatBody()}
          setText={true}
        />
      </div>
      <div>
        <span>
          <CustomButton
            label="Send"
            onClick={handleSendClick()}
            type="button"
            disabled={false}
          />
          <CustomButton
            label="Back"
            onClick={() => handleRouteClick("/Index")}
            type="button"
            disabled={false}
          />
          <CustomButton
            label="Help"
            onClick={() => handleRouteClick("/Help")}
            type="button"
            disabled={false}
          />
        </span>
      </div>
    </div>
  );
}