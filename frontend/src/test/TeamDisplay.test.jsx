// ESLint incorrectly throwing an undefined error for 'test' and 'expect', even though they're included in Jest
/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HomePage from '../home/HomePage';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { thunk } from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from '../redux/reducers';

// Code generated using ChatGPT to address setup issues with Jest
const renderWithProviders = (
    component,
    {
        initialState, 
        store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk))) 
    } = {} // Default empty
) => {
    return {
        ...render(
            <Provider store={store}>
                <Router>
                    {component}
                </Router>
            </Provider>
        ),
        store,
    };
};

// Tests that the TeamDisplay shows no elements when there are initially no members in the redux thunk
test("Correctly displays no elements", async () => {
    renderWithProviders(<HomePage />, {
        initialState: {
            "teamMembers": [],
            "numPages": 1,
        }
    });

    await userEvent.click(screen.getByText("Show"));
    await screen.getByText("Hide").nextSibling;

    expect(screen.getByText("Hide").nextSibling.firstChild).toHaveTextContent("No members in team!");
});

// TEST 