/**
 * Get a sequence of question/answer combinations
 * @author Justin Gray (A00426753) - the whole file
 */
import React from "react";

/**
 * A custom React component to create a list of questions & answers.
 * Use is simple: have a useState hook such as:
 *          const [questions, setQuestions] = React.useState([]);
 * And later call this component in your render using:
 *          <QuestionManager questions={questions} setQuestions={setQuestions} />
 * All validation and specific implementations need to be done in the calling component.
 *
 * @props prefix        the prefix label to the order of the question. For example, "Question"
 *                      will lead each row's label to be "Question N" where N is the order
 * @props questions     an object array with the shape { question: String, answer: String }
 * @props setQuestions  a function to set the new set of questions
 * @props readOnlyQuest boolean - if the questions are readonly
 */
export default function QuestionManager({
  prefix,
  questions = [], // satisfy NextJS build process
  setQuestions,
  readOnlyQuest = false,
}) {
  /**
   * Sets a question and answer combination in the questions state
   * @param {number} index      the index of the q/a combination
   * @param {string} question   the new question value
   * @param {string} answer     the new answer value
   */
  function setQuestion(index, question, answer) {
    const copy = JSON.parse(JSON.stringify(questions));
    copy[index] = { question, answer };
    setQuestions(copy);
  }

  /**
   * Add a new question to the questions array
   * @param {string} question the initial question value
   * @param {string} answer   the initial answer value
   */
  function addQuestion(question, answer) {
    const copy = JSON.parse(JSON.stringify(questions));
    copy.push({
      question,
      answer,
    });
    setQuestions(copy);
  }

  /**
   * Remove a question from the list
   * @param {number} index
   */
  function removeQuestion(index) {
    const copy = JSON.parse(JSON.stringify(questions));
    copy.splice(index, 1);
    setQuestions(copy);
  }

  return (
    <div>
      {questions.map((qa, i) => (
        <QuestionRow
          key={i}
          questionNum={i + 1}
          question={qa.question}
          answer={qa.answer}
          setQuestion={(q) => setQuestion(i, q, questions[i].answer)}
          setAnswer={(a) => setQuestion(i, questions[i].question, a)}
          remove={() => removeQuestion(i)}
          focused={i == questions.length - 1}
          prefix={prefix}
          readOnlyQuest={readOnlyQuest}
        />
      ))}

      {readOnlyQuest ? null : (
        <QuestionRow
          answer=""
          question=""
          questionNum={questions.length + 1}
          setQuestion={(q) => addQuestion(q, "")}
          setAnswer={(a) => addQuestion("", a)}
          remove={() => {}}
          prefix={prefix}
        />
      )}
    </div>
  );
}

/**
 * The input row with
 *      Question N [--question--][---answer---][X]
 * @props question      the security question's question value
 * @props answer        the security question's answer value
 * @props setQuestion   sets the security question's question value
 * @props setAnswer     sets the security question's answer value
 * @props questionNum   the question number of the security question
 * @props remove        a function to remove this question
 * @props focused       if the question field should be autoFocused
 */
function QuestionRow({
  question = "",
  answer = "",
  setQuestion = (q) => {},
  setAnswer = (a) => {},
  prefix = "",
  questionNum = 0,
  remove = () => {},
  focused = false,
  readOnlyQuest = false,
}) {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">
          {prefix} {questionNum}
        </label>
      </div>

      <div className="field-body control">
        <input
          className="input"
          type="text"
          placeholder="Any question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          readOnly={readOnlyQuest}
          autoFocus={focused && !readOnlyQuest}
        />
        <input
          className="input"
          type="text"
          placeholder="Any answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          autoFocus={focused && readOnlyQuest}
        />
        {readOnlyQuest ? null : (
          <button className="button" onClick={remove}>
            X
          </button>
        )}
      </div>
    </div>
  );
}
