/**
 * This file displays a help page
 *
 * @author Tiffany Conrad (A00414194)
 */
import React from "react";
import Layout from "./components/StudentLayout";
import { useRouter } from "next/router";
import CustomButton from "./components/CustomButton";
import Accordion from "./components/Accordion";
/**
 * This function displays a help page
 */
export default function Help() {
  const router = useRouter();

  /**
   * This function navigates back to a page when back button is clicked
   */
  function handleBackClick() {
    router.back();
  }

  return (
    <Layout>
      <h1 className="title">General Emailing Questions</h1>
      <div>
        <Accordion
          title="Should I write Formally or Informally?"
          content="If you are writing to a professor or a boss, you should write formally. If you are writing to a friend or family member, you can write informally"
        />
        <Accordion
          title="What is CC? When should I use CC?"
          content="CC sends a copy of your email to the person who's email you specified. Individuals who are CC'd normally don't reply to the email."
        />
        <Accordion
          title="How do I write a descriptive Subject?"
          content="Your subject line should be straight to the point! For example, if you were writing to an instructor, your subject line could be <strong>'Question about [Class Name] assignment'</strong>"
        />
      </div>
      <br />

      <h1 className="title">Formal Emailing Questions</h1>
      <div>
        <Accordion
          title="What are some proper greetings for professional emails?"
          content="Some formal greetings include <em>'Dear, Mr./Ms. [Last Name]', 'Greetings', or 'Hello, [name]'</em>. If you are emailing a business and are unsure of who to address, you may say <em>'To whom it may concern,'</em>"
        />
        <Accordion
          title="How do I write a proper body in my formal email?"
          content="If you are emailing someone you do not know for the first time, you should introduce yourself: 'My name is [name]. I will be attending [class name] this semester and would like to inquire about the required textbooks'. 
              If you are writing a lot, it is important to have one space between paragraphs. You should avoid using slang"
        />
        <Accordion
          title="What are some proper closings for professional Emails?"
          content="Some common formal closings include 'Thank you,', 'Yours sincerely,' and 'Kind regards'"
        />
        <Accordion
          title="Is it acceptable to use emojis in professional emails?"
          content="No, it is not acceptable to use emojis in professional emails."
        />

        <h1 className="title">Informal Emailing Questions</h1>
        <div>
          <Accordion
            title="What are proper greetings for informal emails?"
            content="Informal emails allow for a lot of freedom! A simple 'Hey, [Name]' is acceptable, and you can even set the tone by saying 'I hope you are having a great week!'."
          />
          <Accordion
            title="How do I write a proper body in my informal email?"
            content="Although you should split your body into paragraphs, you don't need to avoid slang or emojis."
          />
          <Accordion
            title="What are some closings for an informal email?"
            content="Some closings for informal emails include 'TTYL', 'Cheers', and 'Until next time'. It is important to note that you have a lot of freedom when choosing informal email closings!"
          />
          <Accordion
            title="Is it acceptable to use emojis in informal emails?"
            content="It is perfectly fine to use emojis in informal emails!"
          />
        </div>
      </div>

      <CustomButton
        label="Back"
        onClick={() => handleBackClick()}
        type="button"
        disabled={false}
      />
    </Layout>
  );
}
