import store from '../store';
import { useRouter } from 'next/router';
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";
import TextBox from "./components/TextBox";
import InputTextBox from "./components/InputTextBox";
import Layout from "./components/StudentLayout";

export default function replyPage() {
  const router = useRouter(); // Routes inside functions.
  const storeState = store.getState();
  const pageState = storeState[0];

  function formatTo() {
    try {  
      const formatted = pageState.name + " (" + pageState.email +")";
      return formatted;
    } catch(err) {
      return "";  
    }
  }

  function formatSubject() {
    try {  
        const prefix = "RE: "
        const formatted = prefix + pageState.subject;
        return formatted;
    } catch(err) {
        return "";
    }
  }

  function formatBody() {
    try {  
        const prefix = "---------- QUOTED MESSAGE ----------\n"
        const suffix = "\n---------- END OF QUOTE ------------\n"
        const formatted = prefix + pageState.body + suffix;
        return formatted;
    } catch(err) {
        return "";
    }
  }

  function handleSendClick() {

  }
  
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
        <TextBox
          label="To"
          rows="1"
          text={formatTo()}
        />
        <InputTextBox 
            label="CC" 
            rows="1" 
            text=""
        />
        <InputTextBox
          label="Subject"
          rows="1"
          text={formatSubject()}
        />
        <InputTextBox
          label="Body"
          rows="10"
          text={formatBody()}
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
    </Layout>
  );
}