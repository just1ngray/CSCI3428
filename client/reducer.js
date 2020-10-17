/** Reducer for store.js 
 * 
 * @param {*} state takes a state that is dispatched 
 *                  from other file and saves it in store.
 * @param {*} action defines what is being performed.
 * @author Nicholas Morash (A00378981)
 */

export default function reducer(state = [], action) {
    switch (action.type) {
        case "setReplyEmail":
            return [
                ...state,
                {
                    _id: action.payload._id,
                    name: action.payload.name,
                    email: action.payload.address,
                    subject: action.payload.subject,
                    body: action.payload.body
                }
            ];
        default:
            return state;
    }
}