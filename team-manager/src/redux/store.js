// Code and explanations of Redux attributed to ChatGPT
import {createStore} from "redux";
import rootReducer from "./reducers";
import {composeWithDevTools} from "@redux-devtools/extension";

const store = createStore(rootReducer, composeWithDevTools());

export default store
