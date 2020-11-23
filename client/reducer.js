/** Reducer for store.js
 *
 * @param {*} state takes a state that is dispatched
 *                  from other file and saves it in store.
 * @param {*} action defines what is being performed.
 * @author Nicholas Morash (A00378981)
 */

import jwt from "jsonwebtoken";

export default function reducer(state = [], action) {
  switch (action.type) {
    case "setReplyEmail":
      return {
        ...state,
        reply: {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.address,
          subject: action.payload.subject,
          body: action.payload.body,
        },
      };
    case "setViewEmail":
      return {
        view: {
          _id: action.payload._id,
          name: action.payload.name,
          email: action.payload.address,
          toName: action.payload.toName,
          toAddress: action.payload.toAddress,
          subject: action.payload.subject,
          body: action.payload.body,
        },
      };
    case "LOGIN": {
      const payload = jwt.decode(action.jwt);
      return {
        ...state,
        account: {
          jwt: action.jwt,
          _id: payload._id,
          name: payload.name,
          email: payload.email,
        },
      };
    }

    case "currentId":
      return { ...state, emailId: action.payload };
    case "setTo":
      return { ...state, toText: action.payload };
    case "setCC":
      return { ...state, ccText: action.payload };
    case "setSubject":
      return { ...state, subText: action.payload };
    case "setBody":
      return { ...state, bodyText: action.payload };
    case "setEmail":
      return { ...state, signInEmail: action.payload };
    case "setPass":
      return { ...state, pass: action.payload };
    case "setGreeting":
      return { ...state, greeting: action.payload };
    case "setMessage":
      return { ...state, message: action.payload };
    case "setClosing":
      return { ...state, closing: action.payload };
    case "userAuthor":
      return { ...state, userAuthor: action.payload };
    case "setName":
      return { ...state, contactName: action.payload };
    default:
      return state;
  }
}
