/** Redux Store for storing email states across pages.
    @author Nicholas Morash (A00378981)
*/ 
import { createStore } from "redux";;
import reducer from "./reducer";

const store = createStore(reducer);

export default store;