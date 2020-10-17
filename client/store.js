import { createStore, applyMiddleware } from "redux";
import reducer from './reducer';

/** Redux Store for storing email states across pages.
    @author Nicholas Morash (A00378981)
*/ 
const store = createStore(reducer);

export default store;