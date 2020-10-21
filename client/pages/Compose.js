/**Same For Reply.js
 * Set the local state of email components
 * posdt email
 * 
 */

import store from '../store';
import { useRouter } from 'next/router';
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import InputTextBox from './components/InputTextBox';
import BodySplitter from './components/BodySplitter';
import Layout from './components/StudentLayout';

export default function () {
  const router = useRouter(); // Routes inside functions.

  function handleSendClick() {
    //const store

  }
  
  function handleRouteClick(route) {
    router.push(route);
  }

  function handleBackClick() {
    router.back()
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
        <InputTextBox 
            label="CC" 
            rows="1"  
        />
        <InputTextBox
          label="Subject"
          rows="1"
        />
        <BodySplitter/>
      </div>
      <div>
        <br />
        <span>
        <div class="buttons">
          <CustomButton
            label="Send"
            onClick={handleSendClick()}
            type="button"
            disabled={false}
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

