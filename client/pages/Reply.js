/**
 * This file displays a reply page with cc, subject, and body section
 *
 * @author
 */
import store from "../store";
import { useRouter } from "next/router";
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import TextBox from "./components/TextBox";
import InputTextBox from "./components/InputTextBox";
import Layout from "./components/StudentLayout";

/**
 * This function returns the reply page
 */
export default function replyPage() {
  const router = useRouter(); // Routes inside functions.
  const storeState = store.getState();
  console.log(storeState);
  const pageState = storeState.reply;
  console.log(pageState);

  /**
   * This function return the formatted 'TO' section
   */
  function formatTo() {
    try {
      const formatted = pageState.name + " (" + pageState.email + ")";
      return formatted;
    } catch (err) {
      return "";
    }
  }

  /**
   * This function returns the formatted subject section
   */
  function formatSubject() {
    try {
      const prefix = "RE: ";
      const formatted = prefix + pageState.subject;
      return formatted;
    } catch (err) {
      return "";
    }
  }

  /**
   * This function returns the formatted body section
   */
  function formatBody() {
    try {
      const prefix = "---------- QUOTED MESSAGE ----------\n";
      const suffix = "\n---------- END OF QUOTE ------------\n";
      const formatted = prefix + pageState.body + suffix;
      return formatted;
    } catch (err) {
      return "";
    }
  }

  /**
   * This function passes the data when Send button is clicked
   */

  function handleSendClick() {}

  /**
   * This function routes to back page when back button is clicked
   */
  function handleBackClick() {
    router.back();
  }

  /**
   * This function navigates to a new url when button is clicked
   * @param {*} route the url to navigate to
   */
  function handleRouteClick(route) {
    router.push(route);
  }

  return (
    <Layout>
      <div>
        <PageTitle title={`COMPOSING ${"REPLY"}`} />{" "}
        {/* is user_id the from._id */}
      </div>
      <div>
        <TextBox label="To" rows="1" text={formatTo()} />
        <InputTextBox label="CC" rows="1" text="" />
        <InputTextBox label="Subject" rows="1" text={formatSubject()} />
        <InputTextBox label="Body" rows="10" text={formatBody()} />
      </div>
      <br />
      <div className="buttons">
        <span>
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
        </span>
      </div>
    </Layout>
  );
}
