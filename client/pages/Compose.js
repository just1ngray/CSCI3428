/**
 * This file displays the compose page
 *
 * @author
 */

//required imports
import store from "../store";
import { useRouter } from "next/router";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import InputTextBox from "./components/InputTextBox";
import BodySplitter from "./components/BodySplitter";
import Layout from "./components/StudentLayout";

/**
 * Routes inside functions
 */
export default function () {
  const router = useRouter();

  /**
   * This function sends the email
   */
  function handleSendClick() {
    //const store
  }

  /**
   * This function routes to the url that is passed as a parameter
   * @param {*} route the url
   */
  function handleRouteClick(route) {
    router.push(route);
  }

  /**
   * This function navigates back
   */
  function handleBackClick() {
    router.back();
  }

  return (
    <Layout>
      {/* displays the title of the page*/}
      <div>
        <PageTitle title={`COMPOSING MESSAGE`} />{" "}
        {/* is user_id the from._id */}
      </div>
      {/* displays textboxes for To, CC, and Subject fields */}
      <div>
        <InputTextBox label="To" rows="1" />
        <InputTextBox label="CC" rows="1" />
        <InputTextBox label="Subject" rows="1" />
        <BodySplitter />
      </div>
      <div>
        <br />
        <span>
          {/*button to send email*/}
          <div className="buttons">
            <CustomButton
              label="Send"
              onClick={handleSendClick()}
              type="button"
              disabled={false}
            />
            {/* button to navigate back */}
            <CustomButton
              label="Back"
              onClick={() => handleBackClick()}
              type="button"
              disabled={false}
            />
            {/*button to open help page*/}
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
