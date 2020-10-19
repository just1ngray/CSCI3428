/** Reducer for store.js 
 * 
 * @param {*} state takes a state that is dispatched 
 *                  from other file and saves it in store.
 * @param {*} action defines what is being performed.
 * @author Nicholas Morash (A00378981)
 * @author Justin Gray
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
                    body: action.payload.body
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
        case "setTo":
            return {...state, toText: action.payload}
        case "setCC":
            return {...state, ccText: action.payload}
        case "setSubject":
            return {...state, subText: action.payload}
        case "setBody":
            return {...state, bodyText: action.payload}       
        case "setEmail":
            return {...state, signInEmail: action.payload}
        case "setPass":
            return {...state, pass: action.payload}         
        default:
            return state;
    }
}