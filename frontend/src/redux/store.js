// Code and explanations of Redux attributed to ChatGPT
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {thunk} from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {"teamMembers": [], "numPages": 1};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
